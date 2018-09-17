import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('deserialize empty entities', () => {
    let test_entity: any = {
        gender: 2,
        card: false
    };
    let result: any = {};
    
    let out: ClientComponent = mapper.deserialize(result, ClientComponent);
    UtilTestTools.expectEqual(out, {});

    test_entity = null;
    result = null;
    expect(mapper.deserialize(result, ClientComponent)).toBe(test_entity);

    test_entity = undefined;
    result = undefined;
    expect(mapper.deserialize(result, ClientComponent)).toBe(test_entity);

    test_entity = '';
    result = '';
    expect(mapper.deserialize(result, ClientComponent)).toBe(test_entity);
  });
}
