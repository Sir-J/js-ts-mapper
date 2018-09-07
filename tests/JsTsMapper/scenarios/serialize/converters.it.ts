import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { Gender } from '../../../models/gender';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
    it('serialize with converter', () => {
        let test_entity = new ClientComponent({
            id: 5,
            name: 'Test',
            gender: Gender.Female,
            dateBirth: new Date(2018, 10, 5, 12, 15, 10)
        });
        let result = {
            Id: 5,
            Name: 'Test',
            Gender: 1,
            DateBirth: '2018-11-05T00:00:00',
            Card: false
        };
        
        let out = mapper.serialize(test_entity);
        UtilTestTools.expectEqual(out, result);
    });
}
