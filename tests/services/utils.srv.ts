import { JsTsMapper } from '../../src/mapper';
export class UtilTestTools {
    mapper: JsTsMapper;
    constructor() {
        this.mapper = new JsTsMapper();
    }
    static expectEqual(a, b) {
        expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    }
}