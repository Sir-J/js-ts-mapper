import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { Gender } from '../../../models/gender';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('deserialize with converter', () => {
    let test_entity = {
      gender: Gender.Female,
      card: false,
      id: 5,
      name: 'Test',
      dateBirth: '2018-11-04T21:00:00.000Z'
    };
    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 1,
      DateBirth: '2018-11-05T00:00:00',
      Card: false
    };
    let out = mapper.deserialize(result, ClientComponent);
    expect(out instanceof ClientComponent).toBeTruthy();
    expect(out.dateBirth instanceof Date).toBeTruthy();
    UtilTestTools.expectEqual(out, test_entity);
  });
}
