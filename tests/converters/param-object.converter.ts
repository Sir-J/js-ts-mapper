import { JsTsCustomConvert } from 'ts-mapper';
import { Param } from '../models/bank-account';

export class ParamObjectConverter implements JsTsCustomConvert<Array<Param>> {
    serialize(value: Array<Param>): Object {
        const obj = {};
        if (value) {
            value.forEach(item => (obj[item.name] = item.value));
            return obj;
        }

        return undefined;
    }
    deserialize(value: object): Array<Param> {
        let result = new Array<Param>();
        if (value) {
            for (const val in value) {
                if (value[val]) {
                    result.push(new Param(val, value[val]));
                }
            }
            result = result.sort((item1: Param, item2: Param) => {
                if (item1.name > item2.name) {
                    return 1;
                }
                if (item1.name < item2.name) {
                    return -1;
                }

                return 0;
            });
            return result;
        }

        return undefined;
    }
}
