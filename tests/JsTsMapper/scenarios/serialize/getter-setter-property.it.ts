import { JsTsMapper } from 'ts-mapper';
import { AdminUser } from '../../../models/admin-user';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
    it('getter test', () => {
        const test_entity = new AdminUser({
            id: 5,
            firstName: 'Test',
            middleName: 'Test2',
            lastName: 'Test3'
        });
        const result = {
            Id: 5,
            FullName: 'Test3 Test Test2'
        };
        const out = mapper.serialize(test_entity);
        UtilTestTools.expectEqual(out, result);
    });


    it('setter test', () => {
        const test_entity = {
            Id: 5,
            FullName: 'Test Test2 Test3',
        };
        const out: AdminUser = mapper.deserialize(test_entity, AdminUser);
        expect(out._firstName).toEqual('Test');
        expect(out._lastName).toEqual('Test2');
        expect(out._middleName).toEqual('Test3');
    });
}
