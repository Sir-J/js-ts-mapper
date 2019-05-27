import { JsTsMapper } from '../../../../src';
import { UtilTestTools } from '../../../services/utils.srv';
import { BankAccount } from '../../../models/bank-account';

export function run(mapper: JsTsMapper) {
    it('deserialize Array of objects', () => {
        let test_entity = [
            new BankAccount({
                id: 125,
                number: '25125566963',
                created: '2015-11-11T21:00:00.000Z',
                ownerId: 1586,
                hasProlong: true,
                params: [{ name: 'param1', value: 1 }, { name: 'param2', value: 2 }]
            }),
            new BankAccount({
                id: 2563,
                number: '8545596585',
                created: '2016-11-11T21:00:00.000Z',
                ownerId: 2584,
                hasProlong: false,
                params: [{ name: 'param1', value: 1 }, { name: 'param2', value: 2 }]
            })
        ];

        let result = [
            {
                Id: 125,
                Number: '25125566963',
                Created: '2015-11-11T21:00:00.000Z',
                OwnerId: 1586,
                HasProlong: true,
                Params: {
                    param1: 1,
                    param2: 2
                }
            },
            {
                Id: 2563,
                Number: '8545596585',
                Created: '2016-11-11T21:00:00.000Z',
                OwnerId: 2584,
                HasProlong: false,
                Params: {
                    param1: 1,
                    param2: 2
                }
            }
        ];

        let out: Array<BankAccount> = mapper.deserializeArray(result, BankAccount);

        UtilTestTools.expectEqual(out, test_entity);
        let out2: Array<BankAccount> = mapper.deserialize(result, BankAccount);

        UtilTestTools.expectEqual(out2, test_entity);
        expect(out instanceof Array).toBeTruthy();
        expect(out[0] instanceof BankAccount).toBeTruthy();
        expect(out[0].created instanceof Date).toBeTruthy();
        expect(out[0].params instanceof Array).toBeTruthy();
        expect(mapper.deserializeArray(null, BankAccount)).toBe(null);
        expect(mapper.deserializeArray(undefined, BankAccount)).toBe(undefined);
    });
}
