import { JsonProperty } from "../../src";
import { DateConverter } from '../converters/date-converter';

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
}