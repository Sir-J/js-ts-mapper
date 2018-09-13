import 'reflect-metadata';
import { ServerNameMetadataKey, AvailableFieldsMetadataKey, IgnoreUndecoratedPropertyKey } from './config';
import { JsTsCustomConvert, BaseJsTsCustomConvert } from './interface';
import { FieldProperty } from './field-property';

/**
 * Декоратор с помощью которого объявляем, свойство дял маппинга
 * @param name Имя свойства в объекте
 * @param customConverter Конвертер, специфичным образом прообразующее значение
 */
export function JsonProperty(name?: string, customConverter?:  { new (): BaseJsTsCustomConvert } | [{ new (...arg): any }]) {
    return (target: Object, propertyKey: string) => {
        /**
         * Сохраняем в метаданных переданный name, либо название самого свойства, если параметр не задан
         */
        Reflect.defineMetadata(ServerNameMetadataKey, name || propertyKey, target, propertyKey);
        /**
         * Проверяем, не определены ли уже availableFields другим экземпляром декоратора
         */
        let availableFields = Reflect.getMetadata(AvailableFieldsMetadataKey, target);
        if (!availableFields) {
            availableFields = [];
            /**
             * Не передаем 4-й параметр(propertyKey) в defineMetadata, т.к. метаданные общие для всех полей
             */
            Reflect.defineMetadata(AvailableFieldsMetadataKey, availableFields, target);
        }
        /**
         * Регистрируем текущее поле в метаданных
         */
        let field: FieldProperty;
        const propType = Reflect.getMetadata('design:type', target, propertyKey);
        /**
         * Если массив, то смотрим какого типа этот массив
         */
        if (propType === Array) {
            field = new FieldProperty(propertyKey, customConverter ? (customConverter[0] ? customConverter[0] : undefined) : undefined);
        } else {
            /**
             * Проверяем передан ли класс конвертера значения.
             */
            if (customConverter && typeof customConverter === 'function') {
                const converter = new customConverter() as JsTsCustomConvert<any>;
                /**
                 * Проверяем, что он реализует интерфейс кастомного конвертера
                 */
                if (typeof converter.serialize === 'function' && typeof converter.deserialize === 'function') {
                    field = new FieldProperty(propertyKey, undefined, converter);
                } else  {
                    field = new FieldProperty(propertyKey, customConverter);
                }
            } else {
                field = new FieldProperty(propertyKey);
            }
        }
        if (field) {
            availableFields.push(field);
        }
    };
}

/**
* Декоратор для сериализации только декорированных свойств
*/
export function SerializeOnlyDecorated() {
    return (target: Object) => {     
        /**
        * Отправляем в метаданные флаг о том, что сериализации в контексте класса подвергаются только декарированные свойства
        */
        Reflect.defineMetadata(IgnoreUndecoratedPropertyKey, true, target);
    };
}
