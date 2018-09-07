import { UtilTestTools } from '../../../services/utils.srv';
import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';


export function run(mapper: JsTsMapper) {    
  it('Simple case of serialization', () => {
    let test_entity = new ClientComponent({
      id: 5,
      name: 'Test',
      phone: null,
      comments: ['comment1', 'comment2', 'comment3'],
      roleIds: [115, 2225, 5552, 5555]
    });
    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 2,
      Card: false,
      Phone: null,
      Comments: ['comment1', 'comment2', 'comment3'],
      RoleIds: [115, 2225, 5552, 5555]
    };
    
    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);
  });
}
