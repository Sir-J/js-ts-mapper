import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(tools: UtilTestTools) {
  it('simple deserialize', () => {
    let mapper: JsTsMapper = tools.mapper;
    let test_entity = { 
        gender: 2, 
        card: false, 
        id: 5, 
        name: 'Test' 
    };
    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 2,
      Card: false,
      Phone: null
    };

    let out: ClientComponent = mapper.deserialize(result, ClientComponent);
    UtilTestTools.expectEqual(out, test_entity);
  });
}
