import { JsTsCustomConvert } from 'src/app/js-ts-mapper/interface';

export class FieldProperty {
    name: string;
    type: any;
    converter: JsTsCustomConvert<any>;

    constructor(_name: string, _type?: any, _converter?: JsTsCustomConvert<any>) {
        this.name = _name;
        this.type = _type;
        this.converter = _converter;
    }
}
