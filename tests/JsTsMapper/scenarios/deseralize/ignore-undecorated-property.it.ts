import { JsTsMapper } from 'ts-mapper';
import { Employeer, Employeer2 } from '../../../models/employeer';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('serialize undecorated property', () => {
    let test_entity = new Employeer({
      selected: true,
      id: 256,
      firstName: 'Test',
      lastName: 'Test',
      middleName: 'Test'
    });

    let result: any = {
      Id: 256,
      FirstName: 'Test',
      LastName: 'Test',
      MiddleName: 'Test'
    };

    let out = mapper.deserialize(result, Employeer);
    UtilTestTools.expectEqual(out, test_entity);

    test_entity = new Employeer2({
      selected: true,
      checked: false,
      id: 256,
      firstName: 'Test',
      lastName: 'Test',
      middleName: 'Test'
    });
    result = {
      selected: true,
      checked: false,
      Id: 256,
      FirstName: 'Test',
      LastName: 'Test',
      MiddleName: 'Test'
    };
    out = mapper.deserialize(result, Employeer2);
    UtilTestTools.expectEqual(out, test_entity);
  });
}
