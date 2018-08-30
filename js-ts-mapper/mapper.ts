import { AvailableFieldsMetadataKey, ConverterDataMetadataKey, ServerNameMetadataKey, ConverterArrayDataMetadataKey } from './config';

/**
 * Класс реализующий маппинг
 */
export class JsTsMapper {
    /**
     * Маппинг класса на объект
     * @param obj Класс, который необходимо с маппить на объект
     */
    serialize<T>(obj: T): Object {
        const serverObj = {};

        const target = Object.getPrototypeOf(obj);
        const availableNames = Reflect.getMetadata(AvailableFieldsMetadataKey, target) as [string];
        availableNames.forEach(propName => {
            const serverName = Reflect.getMetadata(ServerNameMetadataKey, target, propName);
            if (serverName) {
                const clientVal = obj[propName];
                if (clientVal) {
                    let serverVal;
                    const propType = Reflect.getMetadata('design:type', target, propName);
                    const propTypeServerFields = Reflect.getMetadata(AvailableFieldsMetadataKey, propType.prototype) as [string];
                    if (clientVal && propTypeServerFields) {
                        if (clientVal instanceof Array) {
                            serverVal = this.serializeArray(clientVal);
                        } else {
                            serverVal = this.serialize(clientVal);
                        }
                    } else {
                        serverVal = clientVal;
                    }
                    const converter = Reflect.getMetadata(ConverterDataMetadataKey, target, propName);
                    if (converter) {
                        serverObj[serverName] = converter.serialize(serverVal);
                    } else {
                        serverObj[serverName] = clientVal;
                    }
                }
            }
        });

        if (!availableNames) {
            this.errorNoPropertiesFound(this.parseTypeName(obj.constructor.toString()));
        }

        return serverObj;
    }

    /**
     * Маппинг массива классов
     * @param array
     */
    serializeArray<T>(array: Array<T>): Array<Object> {
        return array.map(item => this.serialize(item)) as Array<Object>;
    }

    /**
     * Маппинг объекта на класс
     * @param obj Объект, который необходимо с маппить на класс
     * @param type Тип класса, который будет заполнен значениями оз объекта
     */
    deserialize<T>(obj: Object, type: { new(): T; }): T {
        /**
         * Создаем объект, с помощью конструктора, переданного в параметре type
         */
        const clientObj: T = new type();
        /**
         * Получаем контейнер с метаданными
         */
        const target = Object.getPrototypeOf(clientObj);
        /**
         * Получаем из метаданных, какие декорированные свойства есть в классе
         */
        const availableNames = Reflect.getMetadata(AvailableFieldsMetadataKey, target) as [string];
        if (availableNames) {
            /**
             * Обрабатываем каждое свойство
             */
            availableNames.forEach(propName => {
                /**
                 * Получаем из метаданных имя свойства в JSON
                 */
                const serverName = Reflect.getMetadata(ServerNameMetadataKey, target, propName);
                if (serverName) {
                    /**
                     * Получаем значение, переданное сервером
                     */
                    const serverVal = obj[serverName];
                    if (serverVal) {
                        let clientVal = null;
                        /**
                         * Проверяем, используются ли в классе свойства декораторы @JsonProperty
                         * Получаем конструктор класса
                         */
                        const propType = Reflect.getMetadata('design:type', target, propName);
                        if (propType === Array) {
                            const classType = Reflect.getMetadata(ConverterArrayDataMetadataKey, target, propName);
                            clientVal = this.deserializeArray(serverVal, classType);
                        } else {
                            /**
                             * Смотрим, есть ли в метаданных класса информация о свойствах
                             */
                            const propTypeServerFields = Reflect.getMetadata(AvailableFieldsMetadataKey, propType.prototype) as [string];
                            if (propTypeServerFields) {
                                /**
                                 * Да, класс использует наш декоратор, обрабатываем свойство рекурсивно
                                 */
                                clientVal = this.deserialize(serverVal, propType);
                            } else {
                                /**
                                 * Проверяем, есть ли кастомный конвертер, если есть, то преобразовываем значение
                                 */
                                const converters = Reflect.getMetadata(ConverterDataMetadataKey, target);
                                if (converters && converters[propName]) {
                                    clientVal = converters[propName].deserialize(serverVal);
                                } else {
                                    clientVal = serverVal;
                                }

                            }
                        }
                        /**
                         * Записываем результирующее значение
                         */
                        clientObj[propName] = clientVal;
                    }
                }
            });
        } else {
            this.errorNoPropertiesFound(this.getTypeName(type));
        }

        return clientObj;
    }

    /**
     * Маппинг массива объектов
     * @param array Массив объектов
     * @param type Тип класса
     */
    deserializeArray<T>(array: Array<object>, type: { new(): T; }): Array<T> {
        return array.map(item => this.deserialize(item, type)) as Array<T>;
    }

    private errorNoPropertiesFound<T>(typeName: string) {
        throw new Error('Отсутствуют правила конвертации значений');
    }

    private getTypeName<T>(type: { new(): T; }) {
        return this.parseTypeName(type.toString());
    }

    private parseTypeName(ctorStr: string) {
        const matches = ctorStr.match(/\w+/g);
        if (matches.length > 1) {
            return matches[1];
        } else {
            return '<невозможно определить имя типа>';
        }
    }
}
