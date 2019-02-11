import { JsTsCustomConvert } from "../../interface";

export class StringToArray implements JsTsCustomConvert<any> {
    serialize(str: string): any {
        return str.replace(/ /g, '').split(',');
    }
    deserialize(arr: [string]): string {
        return arr.join(', ');
    }
}