
export interface BaseJsTsCustomConvert {

    /**
     * Конвертирует значение свойства при маппинге класса в объект
     * @param data Значение свойства класса
     * @return {any} Значение свойства объекта
     */
    serialize(data: any): any;

    /**
     * Конвертирует значение свойства при маппинге объекта в класс
     * @param data Значение свойства объекта
     * @return {T} Значение свойства класса
     */
    deserialize(data: any): any;

}

/**
 * Интерфейс кастомного конвыертера
 */
export interface JsTsCustomConvert<T> extends BaseJsTsCustomConvert {

    /**
     * Конвертирует значение свойства при маппинге класса в объект
     * @param data Значение свойства класса
     * @return {any} Значение свойства объекта
     */
    serialize(data: T): any;

    /**
     * Конвертирует значение свойства при маппинге объекта в класс
     * @param data Значение свойства объекта
     * @return {T} Значение свойства класса
     */
    deserialize(data: any): T;

}
