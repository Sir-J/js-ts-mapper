import * as moment from 'moment';
import { JsTsMapper } from 'ts-mapper';

import { BankAccount } from '../../../models/bank-account';
import { ClientComponent } from '../../../models/client-component';
import { Gender } from '../../../models/gender';
import { UtilTestTools } from '../../../services/utils.srv';
import { SERIALIZE_FORMAT } from '../../../converters/date-converter';

export function run(mapper: JsTsMapper) {
  it('serialize array properties', () => {

    const d1 = new Date(2018, 10, 5);
    const d2 = new Date(2018, 10, 5);
    const d3 = new Date(2018, 10, 5);

    const date1 =  moment.utc(d1);
    const date2 =  moment.utc(d2);
    const date3 =  moment.utc(d3);

    let test_entity = new ClientComponent({
      id: 5,
      name: 'Test',
      gender: Gender.Female,
      dateBirth: d1,
      bankAccount: [
        new BankAccount({
          id: 125,
          number: '25125566963',
          created: d2,
          ownerId: 1586,
          hasProlong: true
        }),
        new BankAccount({
          id: 2563,
          number: '8545596585',
          created: d3,
          ownerId: 2584,
          hasProlong: false
        })
      ]
    });

    let result = {
      Id: 5,
      Name: 'Test',
      Gender: 1,
      DateBirth: date1.format(SERIALIZE_FORMAT),
      Card: false,
      BankAccount: [
        {
          Id: 125,
          Number: '25125566963',
          Created: date2.format(SERIALIZE_FORMAT),
          OwnerId: 1586,
          HasProlong: true
        },
        {
          Id: 2563,
          Number: '8545596585',
          Created: date3.format(SERIALIZE_FORMAT),
          OwnerId: 2584,
          HasProlong: false
        }
      ]
    };

    let out = mapper.serialize(test_entity);
    UtilTestTools.expectEqual(out, result);
  });
}
