import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';
import { Gender } from '../../../models/gender';

export function run(tools: UtilTestTools) {
  it('deserialize component with inner component', () => {
    let mapper: JsTsMapper = tools.mapper;
    let test_entity = {
      gender: Gender.Female,
      card: false,
      id: 5,
      name: 'Test',
      dateBirth: '2018-11-04T21:00:00.000Z',
      Address: { value: 'Пресненская набережная, 10' }
    };

    let result = {
      Id: 5,
      Name: 'Test',
      Gender: Gender.Female,
      DateBirth: '2018-11-05T00:00:00',
      Card: false,
      Address: {
        Value: 'Пресненская набережная, 10'
      }
    };
    let out = mapper.deserialize(result, ClientComponent);
    expect(out instanceof ClientComponent).toBeTruthy();
    UtilTestTools.expectEqual(out, test_entity);
  });
}
