import { JsTsMapper } from 'ts-mapper';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('serialize components with nesting of the class', () => {
    // ProductListViewData
    let test_entity = UtilTestTools.getHierachyTestClientObject();

    // Serialization
    let out = mapper.serialize(test_entity);

    // Expected results
    let result = {
      ComponentProperty: 'value',
      Items: [
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-03T00:00:00',
          ComponentArrayItemProperty4: { id: 212, name: 'name' }
        },
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-03T00:00:00',
          ComponentArrayItemProperty4: { id: 212, name: 'name' }
        }
      ],
      ComponentLevel3Property1: 'value',
      ComponentLevel3Property2: 253,
      ComponentLevel3Property3: '2018-11-03T00:00:00',
      ComponentLevel3Property4: { id: 212, name: 'name' },
      ComponentArray3: [
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-03T00:00:00',
          ComponentArrayItemProperty4: { id: 212, name: 'name' }
        },
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-03T00:00:00',
          ComponentArrayItemProperty4: { id: 212, name: 'name' }
        }
      ],
      ComponentLevel2Property1: 'value',
      ComponentLevel2Property2: 253,
      ComponentLevel2Property3: '2018-11-03T00:00:00',
      ComponentLevel1Property4: { id: 212, name: 'name' }
    };

    // Compare results

    UtilTestTools.expectEqual(out, result);
  });
}
