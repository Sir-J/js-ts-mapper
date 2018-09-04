import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { Gender } from '../../../models/gender';
import { UtilTestTools } from '../../../services/utils.srv';
import { BankAccount } from '../../../models/bank-account';

export function run(tools: UtilTestTools) {
  it('deserialize Array of objects', () => {
    let mapper: JsTsMapper = tools.mapper;
    let test_entity = [
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
        ownerId: 2584
      }
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

    let out: Array<BankAccount> = mapper.deserializeArray(result, BankAccount);

    UtilTestTools.expectEqual(out,test_entity);
    expect(out instanceof Array).toBeTruthy();
    expect(out[0] instanceof BankAccount).toBeTruthy();
    expect(out[0].created instanceof Date).toBeTruthy();
  });
}
