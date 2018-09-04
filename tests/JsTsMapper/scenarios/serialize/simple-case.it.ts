import { UtilTestTools } from '../../../services/utils.srv';
import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';


export function run(tools: UtilTestTools) {    
  it('Simple case of serialization', () => {
    let mapper: JsTsMapper = tools.mapper;
    let test_entity = new ClientComponent({
      id: 5,
      name: 'Test',
      phone: null
    });
    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 2,
      Card: false,
      Phone: null
    };
    
    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);
  });
}
