import { JsTsMapper } from 'ts-mapper';
import { Employeer, Employeer2 } from '../../../models/employeer';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('serialize undecorated property', () => {
    let test_entity = new Employeer({
      id: 256,
      firstName: 'Test',
      lastName: 'Test',
      middleName: 'Test',
      selected: true
    });

    let result: any = {
      selected: true,
      Id: 256,
      FirstName: 'Test',
      LastName: 'Test',
      MiddleName: 'Test'
    };

    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);

    test_entity = new Employeer2({
      id: 256,
      firstName: 'Test',
      lastName: 'Test',
      middleName: 'Test',
      selected: true
    });
    result = {
      Id: 256,
      FirstName: 'Test',
      LastName: 'Test',
      MiddleName: 'Test'
    };
    out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);
  });
}
