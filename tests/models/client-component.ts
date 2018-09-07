import { JsonProperty } from "../../src";
import { DateConverter } from '../converters/date-converter';
import { Gender } from './gender';
import { BankAccount } from './bank-account';
import { Address } from "./address";

export class ClientComponent {
    constructor(o) {
        Object.assign(this, o);
    }

    @JsonProperty('Id')
    id: number;

    @JsonProperty('Name')
    name: string;

    @JsonProperty('Gender')
    gender: Gender = Gender.Male;

    @JsonProperty('DateBirth', DateConverter)
    dateBirth: Date;

    @JsonProperty('Card')
    card: boolean = false;

    @JsonProperty('Phone')
    phone: string;

    @JsonProperty('BankAccount', [BankAccount])
    bankAccount?: Array<BankAccount>;

    @JsonProperty()
    Address?: Address;

    @JsonProperty('Comments')
    comments?: Array<string>; 
    
    @JsonProperty('RoleIds', [Number])
    roleIds?: Array<Number>;
}