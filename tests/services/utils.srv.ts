export class UtilTestTools {
    static expectEqual(a, b) {
        expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    }
}