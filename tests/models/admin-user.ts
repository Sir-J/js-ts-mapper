import { SerializeOnlyDecorated, JsonProperty } from '../../src/decorators';

@SerializeOnlyDecorated()
export class AdminUser {
    _firstName: string;
    _lastName: string;
    _middleName: string;

    constructor(o) {
        if (!o) {
            return;
        }
        this.id = o.id;
        this._firstName = o.firstName;
        this._middleName = o.middleName;
        this._lastName = o.lastName;
    }

    @JsonProperty('Id')
    id: number;

    @JsonProperty('FullName')
    // @ts-ignore
    set fullName(value: string) {
        const names = value.split(' ');
        this._firstName = names[0];
        this._lastName = names[1];
        this._middleName = names[2];
    }

    // @ts-ignore
    get fullName(): string {
        return `${this._lastName} ${this._firstName} ${this._middleName}`;
    }
}
