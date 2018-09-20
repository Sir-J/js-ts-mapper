import { JsTsMapper } from 'ts-mapper';
import { ComponentVariant1, ComponentVariant1ArrayItem, ComponentVariant2, ComponentVariant2ArrayItem } from '../../../models/hierachy-components';
import { UtilTestTools } from '../../../services/utils.srv';
import { FieldProperty } from '../../../../src/field-property';
import { AvailableFieldsMetadataKey } from '../../../../src/config';

export function run(mapper: JsTsMapper) {
  it('deserialize components with nesting of the class', () => {
    //Тестовый объект
    let test_entity = {
      ComponentVariant1Property: 'value',
      // Свойста 3 уровня
      ComponentLevel3Property1: 'value',
      ComponentLevel3Property2: 253,
      ComponentLevel3Property3: '2018-11-04T21:00:00.000Z',
      ComponentLevel3Property4: {
        id: 212,
        name: 'name'
      },
      ComponentArray3: [
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-04T21:00:00.000Z',
          ComponentArrayItemProperty4: {
            id: 212,
            name: 'name'
          }
        },
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-04T21:00:00.000Z',
          ComponentArrayItemProperty4: {
            id: 212,
            name: 'name'
          }
        }
      ],

      // свойства второго уровня

      ComponentLevel2Property1: 'value',
      ComponentLevel2Property2: 253,
      ComponentLevel2Property3: '2018-11-04T21:00:00.000Z',
      ComponentLevel2Property4: {
        id: 212,
        name: 'name'
      },
      ComponentArray2: [
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-04T21:00:00.000Z',
          ComponentArrayItemProperty4: {
            id: 212,
            name: 'name'
          }
        },
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-04T21:00:00.000Z',
          ComponentArrayItemProperty4: {
            id: 212,
            name: 'name'
          }
        }
      ],

      // свойства первого уровня

      ComponentLevel1Property1: 'value',
      ComponentLevel1Property2: 253,
      ComponentLevel1Property3: '2018-11-04T21:00:00.000Z',
      ComponentLevel1Property4: {
        id: 212,
        name: 'name'
      },

      //свойство внешнего класса
      ComponentProperty: 'value',
      Items: [
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-04T21:00:00.000Z',
          ComponentArrayItemProperty4: {
            id: 212,
            name: 'name'
          }
        },
        {
          ComponentArrayItemProperty1: 'value',
          ComponentArrayItemProperty2: 256,
          ComponentArrayItemProperty3: '2018-11-04T21:00:00.000Z',
          ComponentArrayItemProperty4: {
            id: 212,
            name: 'name'
          }
        }
      ]
    };
    let out = mapper.deserialize(test_entity, ComponentVariant1);  
    let out2 = mapper.deserialize(test_entity, ComponentVariant2);
    
    //проверка на дублирование свойств при повторной десериализации  
    let out3 = mapper.deserialize(test_entity, ComponentVariant1);
    let prototype = Object.getPrototypeOf(Object.getPrototypeOf(out3));
    let availableFields:Array<FieldProperty> = Reflect.getMetadata(AvailableFieldsMetadataKey, prototype, Reflect.get(prototype.constructor, '$$hash')) as [FieldProperty];
    expect(availableFields.length === 5).toBeTruthy();

    expect(out instanceof ComponentVariant1).toBeTruthy();
    expect(out.items[0] instanceof ComponentVariant1ArrayItem).toBeTruthy();
    expect(out.componentLevel2Property3 instanceof Date).toBeTruthy();
    expect(out.componentLevel3Property3 instanceof Date).toBeTruthy();
    expect(
      out.items[0].componentArrayItemProperty3 instanceof Date
    ).toBeTruthy();

    expect(out2 instanceof ComponentVariant2).toBeTruthy();
    expect(out2.items[0] instanceof ComponentVariant2ArrayItem).toBeTruthy();

    let result = {
      componentProperty: 'value',
      items: [
        {
          componentArrayItemProperty1: 'value',
          componentArrayItemProperty2: 256,
          componentArrayItemProperty3: '2018-11-03T21:00:00.000Z',
          componentArrayItemProperty4: { id: 212, name: 'name' }
        },
        {
          componentArrayItemProperty1: 'value',
          componentArrayItemProperty2: 256,
          componentArrayItemProperty3: '2018-11-03T21:00:00.000Z',
          componentArrayItemProperty4: { id: 212, name: 'name' }
        }
      ],
      componentLevel3Property1: 'value',
      componentLevel3Property2: 253,
      componentLevel3Property3: '2018-11-03T21:00:00.000Z',
      componentLevel3Property4: { id: 212, name: 'name' },
      componentArray3: [
        {
          componentArrayItemProperty1: 'value',
          componentArrayItemProperty2: 256,
          componentArrayItemProperty3: '2018-11-03T21:00:00.000Z',
          componentArrayItemProperty4: { id: 212, name: 'name' }
        },
        {
          componentArrayItemProperty1: 'value',
          componentArrayItemProperty2: 256,
          componentArrayItemProperty3: '2018-11-03T21:00:00.000Z',
          componentArrayItemProperty4: { id: 212, name: 'name' }
        }
      ],
      componentLevel2Property1: 'value',
      componentLevel2Property2: 253,
      componentLevel2Property3: '2018-11-03T21:00:00.000Z',
      componentLevel2Property4: { id: 212, name: 'name' },
      componentArray2: [
        {
          componentArrayItemProperty1: 'value',
          componentArrayItemProperty2: 256,
          componentArrayItemProperty3: '2018-11-03T21:00:00.000Z',
          componentArrayItemProperty4: { id: 212, name: 'name' }
        },
        {
          componentArrayItemProperty1: 'value',
          componentArrayItemProperty2: 256,
          componentArrayItemProperty3: '2018-11-03T21:00:00.000Z',
          componentArrayItemProperty4: { id: 212, name: 'name' }
        }
      ],
      componentLevel1Property1: 'value',
      componentLevel1Property2: 253,
      componentLevel1Property3: '2018-11-03T21:00:00.000Z',
      componentLevel1Property4: { id: 212, name: 'name' }
    };

    UtilTestTools.expectEqual(out, result);
    UtilTestTools.expectEqual(out2, result);
  });
}
