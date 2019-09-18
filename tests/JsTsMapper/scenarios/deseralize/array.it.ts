import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';
import {BankAccount} from "../../../models";

export function run(mapper: JsTsMapper) {
  it('deserialize object with Array', () => {

    const d1 = new Date(2018, 11, 4);
    const d2 = new Date(2018, 11, 11);
    const d3 = new Date(2018, 11, 21);

    let test_entity = {
      gender: 1,
      card: false,
      selected: true,
      id: 5,
      name: 'Test',
      dateBirth: d1.toISOString(),
      bankAccount: [
        {
          id: 125,
          number: '25125566963',
          created: d2.toISOString(),
          ownerId: 1586,
          hasProlong: true
        },
        {
          id: 2563,
          number: '8545596585',
          created: d3.toISOString(),
          ownerId: 2584,
          hasProlong: false
        }
      ]
    };

    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 1,
      DateBirth: d1,
      Card: false,
      selected: true,
      BankAccount: [
        {
          Id: 125,
          Number: '25125566963',
          Created: d2,
          OwnerId: 1586,
          HasProlong: true
        },
        {
          Id: 2563,
          Number: '8545596585',
          Created: d3,
          OwnerId: 2584,
          HasProlong: false
        }
      ]
    };
    const out: ClientComponent = mapper.deserialize(result, ClientComponent);
    expect(out instanceof ClientComponent).toBeTruthy();
    expect(out.dateBirth instanceof Date).toBeTruthy();
    expect(out.bankAccount[0] instanceof BankAccount).toBeTruthy();
    expect(out.bankAccount[0].created instanceof Date).toBeTruthy();
    expect(out.bankAccount[1].created instanceof Date).toBeTruthy();
    UtilTestTools.expectEqual(out, test_entity);
  });
}
