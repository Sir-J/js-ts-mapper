import { JsTsMapper } from 'ts-mapper';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('serialize component with inner component', () => {
    let test_entity = {
      id: 256,
      firstName: 'Test',
      lastName: 'Test',
      middleName: 'Test',
      selected: true
    };

    let result: any = {
        id: 256,
        firstName: 'Test',
        lastName: 'Test',
        middleName: 'Test',
        selected: true
      };

    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);
  });
}
