import { JsTsMapper } from 'ts-mapper';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('serialize empty entities', () => {
    let test_entity = {};
    let result = {};
    
    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);

    test_entity = null;
    result = null;
    expect(mapper.serialize(test_entity)).toBe(result);

    test_entity = undefined;
    result = undefined;
    expect(mapper.serialize(test_entity)).toBe(result);

    test_entity = '';
    result = '';
    expect(mapper.serialize(test_entity)).toBe(result);
  });
}
