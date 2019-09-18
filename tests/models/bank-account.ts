import { JsonProperty } from '../../src';
import { DateConverter } from '../converters/date-converter';
import { ParamObjectConverter } from '../converters/param-object.converter';

export class BankAccount {
    constructor(o?: Object) {
        Object.assign(this, o);
    }

    @JsonProperty('Id')
    id: string;

    @JsonProperty('Number')
    number: string;

    @JsonProperty('Created', DateConverter)
    created: Date;

    @JsonProperty('OwnerId')
    ownerId: number;

    @JsonProperty('HasProlong')
    hasProlong: boolean;

    @JsonProperty('Params', ParamObjectConverter)
    params: Array<Param> = undefined;
}

export class Param {
    @JsonProperty()
    name: string = undefined;

    @JsonProperty()
    value: number = undefined;

    constructor(_name: string, _value: number) {
        this.name = _name;
        this.value = _value;
    }
}
