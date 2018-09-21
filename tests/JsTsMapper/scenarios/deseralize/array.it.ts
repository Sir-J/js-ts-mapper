import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('deserialize object with Array', () => {
    let test_entity = {
      gender: 1,
      card: false,
      selected: true,
      id: 5,
      name: 'Test',
      dateBirth: '2018-11-04T21:00:00.000Z',
      bankAccount: [
        {
          id: 125,
          number: '25125566963',
          created: '2015-11-11T21:00:00.000Z',
          ownerId: 1586,
          hasProlong: true
        },
        {
          id: 2563,
          number: '8545596585',
          created: '2016-11-11T21:00:00.000Z',
          ownerId: 2584,
          hasProlong: false
        }
      ]
    };

    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 1,
      DateBirth: '2018-11-05T00:00:00',
      Card: false,
      selected: true,
      BankAccount: [
        {
          Id: 125,
          Number: '25125566963',
          Created: '2015-11-12T00:00:00',
          OwnerId: 1586,
          HasProlong: true
        },
        {
          Id: 2563,
          Number: '8545596585',
          Created: '2016-11-12T00:00:00',
          OwnerId: 2584,
          HasProlong: false
        }
      ]
    };
    const out: ClientComponent = mapper.deserialize(result, ClientComponent);
    expect(out instanceof ClientComponent).toBeTruthy();
    expect(out.dateBirth instanceof Date).toBeTruthy();
    expect(out.bankAccount[0].created instanceof Date).toBeTruthy();
    expect(out.bankAccount[1].created instanceof Date).toBeTruthy();
    UtilTestTools.expectEqual(out, test_entity);
  });
}
