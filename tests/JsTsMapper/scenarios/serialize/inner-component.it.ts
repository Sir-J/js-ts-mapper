import { UtilTestTools } from '../../../services/utils.srv';
import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { Gender } from '../../../models/gender';
import { Address } from '../../../models/address';

export function run(mapper: JsTsMapper) {
  it('serialize component with inner component', () => {
    let test_entity = new ClientComponent({
      id: 5,
      name: 'Test',
      gender: Gender.Female,
      dateBirth: new Date(2018, 10, 5, 12, 15, 10),
      Address: new Address({ value: 'Пресненская набережная, 12' })
    });

    let result = {
      Address: {
        Value: 'Пресненская набережная, 12'
      },
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
