import { SerializeOnlyDecorated, JsonProperty } from '../../src/decorators';

@SerializeOnlyDecorated()
export class AdminUser {
    _firstName: string;
    _lastName: string;
    _middleName: string;

    constructor(o) {
        this.id = o.id;
        this._firstName = o.firstName;
        this._middleName = o.middleName;
        this._lastName = o.lastName;
    }

    @JsonProperty('Id')
    id: number;

    @JsonProperty('FullName')
    get fullName(): string {
        return `${this._lastName} ${this._firstName} ${this._middleName}`;
    }
}
