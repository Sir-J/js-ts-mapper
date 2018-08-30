import 'reflect-metadata';
import { ServerNameMetadataKey, AvailableFieldsMetadataKey, ConverterDataMetadataKey, ConverterArrayDataMetadataKey } from './config';
import { JsTsCustomConvert } from './interface';

/**
 * Декоратор с помощью которого объявляем, свойство дял маппинга
 * @param name Имя свойства в объекте
 * @param customConverter Конвертер, специфичным образом прообразующее значение
 */
export function JsonProperty(name?: string, customConverter?: any) {
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
        availableFields.push(propertyKey);

        /**
         * Проверяем передан ли класс конвертера значения.
         */
        if (customConverter) {
            if (customConverter instanceof Array) {
                Reflect.defineMetadata(ConverterArrayDataMetadataKey, customConverter[0], target, propertyKey);
            } else {
                const converter = new customConverter() as JsTsCustomConvert<any>;
                /**
                 * Проверяем, что он реализует интерфейс кастомного конвертера
                 */
                if (typeof (converter.serialize) === 'function' && typeof (converter.deserialize) === 'function') {
                    Reflect.defineMetadata(ConverterDataMetadataKey, converter, target, propertyKey);
                }
            }
        }
    };
}
