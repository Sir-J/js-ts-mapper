import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(tools: UtilTestTools) {
  it('deserialize empty entities', () => {
    let mapper: JsTsMapper = tools.mapper;
    let test_entity: any = {
        gender: 2,
        card: false
    };
    let result: any = {};
    
    let out: ClientComponent = mapper.deserialize(result, ClientComponent);
    UtilTestTools.expectEqual(out, test_entity);

    test_entity = null;
    result = null;
    expect(mapper.deserialize(result, ClientComponent)).toBe(test_entity);

    test_entity = null;
    result = undefined;
    expect(mapper.deserialize(result, ClientComponent)).toBe(test_entity);

    test_entity = null;
    result = '';
    expect(mapper.deserialize(result, ClientComponent)).toBe(test_entity);
  });
}
