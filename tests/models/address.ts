import { JsonProperty } from '../../src/decorators';

export class Address {
    constructor(o?: Object) {
        Object.assign(this, o);
    }
    
    @JsonProperty('Value')
    value: string;
}