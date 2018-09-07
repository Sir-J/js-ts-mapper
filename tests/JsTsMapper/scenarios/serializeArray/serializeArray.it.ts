import { JsTsMapper } from 'ts-mapper';
import { BankAccount } from '../../../models/bank-account';
import { UtilTestTools } from '../../../services/utils.srv';

export function run(mapper: JsTsMapper) {
  it('serialize Array of objects', () => {
    let test_entity = [
      new BankAccount({
        id: 125,
        number: '25125566963',
        created: new Date(2015, 10, 12),
        ownerId: 1586,
        hasProlong: true
      }),
      new BankAccount({
        id: 2563,
        number: '8545596585',
        created: new Date(2016, 10, 12),
        ownerId: 2584,
        hasProlong: false
      })
    ];

    let result = [
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
    ];
    UtilTestTools.expectEqual(mapper.serializeArray(test_entity), result);
    UtilTestTools.expectEqual(mapper.serializeArray([]), []);
    UtilTestTools.expectEqual(mapper.serializeArray([1,2,3,4,5]), [1,2,3,4,5]);
    expect(mapper.serializeArray(null)).toBe(null);
    expect(mapper.serializeArray(undefined)).toBe(undefined);    
  });
}
