
import * as moment from 'moment';
import { JsTsCustomConvert } from 'ts-mapper';
export class DateConverter implements JsTsCustomConvert<Date> {
    serialize(date: Date): any {
        if (date) {
          return moment(date).format('YYYY-MM-DDT00:00:00');
        }
    }
    deserialize(date: string): Date {
        if (date) {
            return moment(date, 'YYYY-MM-DDT00:00:00').toDate();
        }
    }
}
