import { JsTsMapper } from 'ts-mapper';
import { AdminUser } from '../../../models/admin-user';
import { Gender } from '../../../models/gender';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
    it('getter/setter test', () => {
        let test_entity = new AdminUser({
            id: 5,
            firstName: 'Test',
            middleName: 'Test2',
            lastName: 'Test3'
        });
        let result = {
            Id: 5,
            FullName: 'Test3 Test Test2'
        };
        
        let out = mapper.serialize(test_entity);
        UtilTestTools.expectEqual(out, result);
    });
}
