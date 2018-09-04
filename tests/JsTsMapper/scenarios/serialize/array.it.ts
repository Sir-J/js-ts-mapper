import { JsTsMapper } from 'ts-mapper';
import { ClientComponent } from '../../../models/client-component';
import { Gender } from '../../../models/gender';
import { UtilTestTools } from '../../../services/utils.srv';
import { BankAccount } from '../../../models/bank-account';

export function run(tools: UtilTestTools) {
  it('serialize object with Array', () => {
    let mapper: JsTsMapper = tools.mapper;
    let test_entity = new ClientComponent({
      id: 5,
      name: 'Test',
      gender: Gender.Female,
      dateBirth: new Date(2018, 10, 5, 12, 15, 10),
      bankAccount: [
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
      ]
    });

    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 1,
      DateBirth: '2018-11-05T00:00:00',
      Card: false,
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

    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);
  });
}
