import { JsonProperty } from '../../src/decorators';
import { DateConverter } from '../converters/date-converter';

export class ComponentArrayItem {
  constructor(o) {
    Object.assign(this, o);
  }

  @JsonProperty('ComponentArrayItemProperty1')
  componentArrayItemProperty1: string;

  @JsonProperty('ComponentArrayItemProperty2')
  componentArrayItemProperty2: number;

  @JsonProperty('ComponentArrayItemProperty3', DateConverter)
  componentArrayItemProperty3: Date;

  @JsonProperty('ComponentArrayItemProperty4')
  componentArrayItemProperty4: Object;
}

export class ComponentVariant1ArrayItem {
  constructor(o) {
    Object.assign(this, o);
  }

  @JsonProperty('ComponentArrayItemProperty1')
  componentArrayItemProperty1: string;

  @JsonProperty('ComponentArrayItemProperty2')
  componentArrayItemProperty2: number;

  @JsonProperty('ComponentArrayItemProperty3', DateConverter)
  componentArrayItemProperty3: Date;

  @JsonProperty('ComponentArrayItemProperty4')
  componentArrayItemProperty4: Object;
}

export class ComponentVariant2ArrayItem {
  constructor(o) {
    Object.assign(this, o);
  }

  @JsonProperty('ComponentArrayItemProperty1')
  componentArrayItemProperty1: string;

  @JsonProperty('ComponentArrayItemProperty2')
  componentArrayItemProperty2: number;

  @JsonProperty('ComponentArrayItemProperty3', DateConverter)
  componentArrayItemProperty3: Date;

  @JsonProperty('ComponentArrayItemProperty4')
  componentArrayItemProperty4: Object;
}

export class ComponentLevel1 {
  @JsonProperty('ComponentLevel1Property1')
  componentLevel1Property1: string;

  @JsonProperty('ComponentLevel1Property2')
  componentLevel1Property2: number;

  @JsonProperty('ComponentLevel1Property3', DateConverter)
  componentLevel1Property3: Date;

  @JsonProperty('ComponentLevel1Property4')
  componentLevel1Property4: Object;

  @JsonProperty('ComponentArray1', [ComponentArrayItem])
  componentArray1: Array<ComponentArrayItem>;
}

export class ComponentLevel2 extends ComponentLevel1 {
  @JsonProperty('ComponentLevel2Property1')
  componentLevel2Property1: string;

  @JsonProperty('ComponentLevel2Property2')
  componentLevel2Property2: number;

  @JsonProperty('ComponentLevel2Property3', DateConverter)
  componentLevel2Property3: Date;

  @JsonProperty('ComponentLevel2Property4')
  componentLevel2Property4: Object;

  @JsonProperty('ComponentArray2', [ComponentArrayItem])
  componentArray2: Array<ComponentArrayItem>;
}

export class ComponentLevel3 extends ComponentLevel2 {
  @JsonProperty('ComponentLevel3Property1')
  componentLevel3Property1: string;

  @JsonProperty('ComponentLevel3Property2')
  componentLevel3Property2: number;

  @JsonProperty('ComponentLevel3Property3', DateConverter)
  componentLevel3Property3: Date;

  @JsonProperty('ComponentLevel3Property4')
  componentLevel3Property4: Object;

  @JsonProperty('ComponentArray3', [ComponentArrayItem])
  componentArray3: Array<ComponentArrayItem>;
}

export class ComponentVariant1 extends ComponentLevel3 {
  constructor(o) {
    super();
    Object.assign(this, o);
  }

  @JsonProperty('ComponentProperty')
  componentProperty: string;

  @JsonProperty('Items', [ComponentVariant1ArrayItem])
  items: Array<ComponentVariant1ArrayItem>;
}

export class ComponentVariant2 extends ComponentLevel3 {
  constructor(o) {
    super();
    Object.assign(this, o);
  }

  @JsonProperty('ComponentProperty')
  componentProperty: string;

  @JsonProperty('Items', [ComponentVariant2ArrayItem])
  items: Array<ComponentVariant2ArrayItem>;
}
