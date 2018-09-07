import { AvailableFieldsMetadataKey, ServerNameMetadataKey } from './config';
import { FieldProperty } from './field-property';

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

        if (!obj || isPrimitive(obj)) {
            return <T>obj;
        }

        const target = Object.getPrototypeOf(obj);
        const availableNames = Reflect.getMetadata(AvailableFieldsMetadataKey, target) as [FieldProperty];
        if (!availableNames) {
            return serverObj;
        }
        availableNames.forEach(field => {
            const serverName = Reflect.getMetadata(ServerNameMetadataKey, target, field.name);
            if (!serverName) {
                return;
            }
            if (obj.hasOwnProperty(field.name)) {
                const clientVal = obj[field.name];
                let serverVal;
                const propType = Reflect.getMetadata('design:type', target, field.name);
                const propTypeServerFields = Reflect.getMetadata(AvailableFieldsMetadataKey, propType.prototype) as [FieldProperty];                
                
                if (clientVal instanceof Array) {
                    serverVal = this.serializeArray<T>(clientVal);
                    serverObj[serverName] = serverVal;
                } else {
                    if (clientVal && propTypeServerFields) {
                        serverVal = this.serialize<T>(clientVal);
                    } else {
                        serverVal = clientVal;
                    }

                    if (field.converter) {
                        serverObj[serverName] = field.converter.serialize(serverVal);
                    } else {
                        serverObj[serverName] = serverVal;
                    }
                }
            }
        });

        return serverObj;
    }

    /**
     * Маппинг массива классов
     * @param array
     */
    serializeArray<T>(array: Array<T>): Array<Object> {
        if (!array || isPrimitive(array)) {
            return <any>array;
        }
        return array.map((item: T) => this.serialize(item)) as Array<Object>;
    }

    /**
     * Маппинг объекта на класс
     * @param obj Объект, который необходимо с маппить на класс
     * @param type Тип класса, который будет заполнен значениями оз объекта
     */
    deserialize<T>(obj: Object, type: { new (...args): T }): T {
        
        if (!obj || isPrimitive(obj)) {
            return <T>obj;
        }

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
        const availableNames = Reflect.getMetadata(AvailableFieldsMetadataKey, target) as [FieldProperty];
        if (!availableNames) {
            return clientObj;
        }
        /**
         * Обрабатываем каждое свойство
         */
        availableNames.forEach((field: FieldProperty) => {
            /**
             * Получаем из метаданных имя свойства в JSON
             */
            const serverName = Reflect.getMetadata(ServerNameMetadataKey, target, field.name);
            if (!serverName) {
                return;
            }
            /**
             * Получаем значение, переданное сервером
             */
            const serverVal = obj[serverName];
            if (!serverVal) {
                return;
            }
            let clientVal = null;
            /**
             * Проверяем, используются ли в классе свойства декораторы @JsonProperty
             * Получаем конструктор класса
             */
            const propType = Reflect.getMetadata('design:type', target, field.name);
            if (propType === Array) {
                clientVal = this.deserializeArray(serverVal, field);
            } else {
                /**
                 * Смотрим, есть ли в метаданных класса информация о свойствах
                 */
                const propTypeServerFields = Reflect.getMetadata(AvailableFieldsMetadataKey, propType.prototype) as [
                    FieldProperty
                ];
                if (propTypeServerFields) {
                    /**
                     * Да, класс использует наш декоратор, обрабатываем свойство рекурсивно
                     */
                    clientVal = this.deserialize(serverVal, propType);
                } else {
                    /**
                     * Проверяем, есть ли кастомный конвертер, если есть, то преобразовываем значение
                     */
                    if (field.converter) {
                        clientVal = field.converter.deserialize(serverVal);
                    } else {
                        clientVal = serverVal;
                    }
                }
                /**
                 * Записываем результирующее значение
                 */
            }
            clientObj[field.name] = clientVal;
        });

        return clientObj;
    }

    /**
     * Маппинг массива объектов
     * @param array Массив объектов
     * @param type Тип класса
     */
    deserializeArray<T>(array: Array<object>, field: FieldProperty | {new(...args):any}): Array<T> {        
        if (!array || isPrimitive(array)) {
            return <any>array;
        }
        let type: { new(...args): any };
        if (field instanceof FieldProperty) {
            type = field.type;
        } else {
            type = field;
        }
        return array.map(item => (type ? this.deserialize(item, type) : item)) as Array<T>;
    }
}

function isPrimitive(value) {
    return (value !== Object(value));
}
