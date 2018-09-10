import { SerializeUndecorated, JsonProperty } from "../../src/decorators";

@SerializeUndecorated()
export class Employeer {
    constructor(o) {
        Object.assign(this, o);
    }

    @JsonProperty('Id')
    id: number;

    @JsonProperty('FirstName')
    firstName: string;

    @JsonProperty('LastName')
    lastName: string;

    @JsonProperty('MiddleName')
    middleName: string;

    selected: boolean = true;
}

export class Employeer2 {
    constructor(o) {
        Object.assign(this, o);
    }
    
    @JsonProperty('Id')
    id: number;

    @JsonProperty('FirstName')
    firstName: string;

    @JsonProperty('LastName')
    lastName: string;

    @JsonProperty('MiddleName')
    middleName: string;

    selected: boolean = true;
}