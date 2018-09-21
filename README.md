# js-ts-mapper
Mapping Json object to Typescript class

## Installing
For installing of the npm-package run command: `npm install js-ts-mapper`.

## Commands
Building into ./dist: `npm run compile`.

Running of tests: `npm run test`.

Publication:
1. Update a version in the `package.json`.
2. Run command `npm run version`.

## Example of using

```typescript
import { JsonProperty, JsTsCustomConvert } from 'js-ts-mapper';
import * as moment from 'moment';

export class Address {    
    @JsonProperty('Value')
    value: string;
}

export class ClientComponent {
    @JsonProperty('Id')
    id: number;

    @JsonProperty('Name')
    name: string;

    @JsonProperty('Gender')
    gender: Gender = Gender.Male;

    @JsonProperty('DateBirth', DateConverter)
    dateBirth: Date;

    // The case of using with Array
    @JsonProperty('BankAccounts', [BankAccount])
    bankAccounts?: Array<BankAccount>;

    @JsonProperty("Address")
    address?: Address;
}

export class BankAccount {

    @JsonProperty('Id')
    id: number;
    
    @JsonProperty('Number')
    number: string;
}

export enum Gender {
    Female = 1,
    Male = 2
}

export class DateConverter implements JsTsCustomConvert<Date> {
    serialize(date: Date): any {
        if (date) {
          return moment(date).format('YYYY-MM-DDT00:00:00');
        }
    }
    deserialize(date: string): Date {
        if (date) {
            return moment(date, 'YYYY-MM-DDT00:00:00').toDate();
        }
    }
}

// Main serializer
let mapper = new JsTsMapper();

// Mocks
let client = new ClientComponent();
client.id = 2563;
client.name = 'Test Test Test';
client.gender = Gender.Male;
client.dateBirth = new Date(1990, 5, 10);
client.address = new Address();
client.address.value = '27 Old Gloucester Street, London';
client.bankAccounts = [new BankAccount(), new BankAccount()];
client.bankAccounts[0].id = 256;
client.bankAccounts[0].number = '545454549';
client.bankAccounts[1].id = 253;
client.bankAccounts[1].number = '545674423';

// try serialize 
let serializedClient = map.serialize(client); 
console.log(serializedClient);

/*
    returns 
    {
        Id: 2563,
        Name: 'Test Test Test',
        Gender: 2,
        DateBirth: '1990-06-10T00:00:00',
        BankAccounts: [
            { Id: 256, Number: '545454549' },
            { Id: 253, Number: '545674423' }
        ],
        Address: {
            Value: '27 Old Gloucester Street, London'
        }
    }
*/

// try deserialize 
let deserializedClient = map.deserialize(serializedClient, ClientComponent); 
console.log(deserializedClient);

/*
    returns
    {
        gender: 2,
        id: 2563,
        name: 'Test Test Test',
        dateBirth: '1990-06-09T20:00:00.000Z',
        bankAccounts: [
            { id: 256, number: '545454549' },
            { id: 253, number: '545674423' }
        ],
        address: { value: '27 Old Gloucester Street, London' }
    }
*/
```

By default all undecorated properties (which don't have a decorator `@JsonProperty()`) pass through the serialization/deserialization.
Decorator `@SerializeOnlyDecorated` can corrects this case and switch on the ignoring such properties.

```typescript

import { SerializeUndecorated, JsonProperty, JsTsMapper } from "js-ts-mapper";

@SerializeOnlyDecorated()
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

let test_entity = new Employeer({
    id: 256,
    firstName: 'Test',
    lastName: 'Test',
    middleName: 'Test',
    selected: true
});

let out = mapper.serialize(test_entity);    
/*
    returns
    {
        Id: 256,
        FirstName: 'Test',
        LastName: 'Test',
        MiddleName: 'Test'
    }
*/

```
