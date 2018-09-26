import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';
import { Gender } from '../../../models/gender';

export function run(mapper: JsTsMapper) {
  it('deserialize component with inner component', () => {
    const date: Date = new Date(2019, 11, 21);

    let test_entity = {
      gender: Gender.Female,
      card: false,
      Address: { value: 'Пресненская набережная, 10' },
      id: 5,
      name: 'Test',
      dateBirth: date.toISOString()
    };

    let result = {
      Id: 5,
      Name: 'Test',
      Gender: Gender.Female,
      DateBirth: date,
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
