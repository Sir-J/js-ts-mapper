
import * as moment from 'moment';
import { JsTsCustomConvert } from 'ts-mapper';

export const SERIALIZE_FORMAT: string = 'YYYY-MM-DDT00:00:00';

export class DateConverter implements JsTsCustomConvert<Date> {
    serialize(date: Date): any {
        if (date) {
          return moment.utc(date).format(SERIALIZE_FORMAT);
        }
    }
    deserialize(date: string): Date {
        if (date) {
            return moment.utc(date, 'YYYY-MM-DDTHH:mm:ss').toDate();
        }
    }
}
