import * as moment from 'moment/moment';

import { JsTsCustomConvert } from '../../interface';

export class DateConverter implements JsTsCustomConvert<Date> {
    serialize(date: Date): any {
        return date ? moment(date).format('YYYY-MM-DDT00:00:00') : undefined;
    }
    deserialize(date: string): Date {
        return date ? moment(date, 'YYYY-MM-DDT00:00:00').toDate() : undefined;
    }
}

export class DateTimeOffsetConverter implements JsTsCustomConvert<Date> {
    serialize(date: Date): string {
        return date ? moment(date).format('YYYY-MM-DDTHH:mm:ss') : null;
    }
    deserialize(date: string): Date {
        if (date) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss').toDate();
        }

        return undefined;
    }
}

export class DateTimeOffsetConverterWithTimeZone implements JsTsCustomConvert<Date> {
    serialize(date: Date): string {
        return date ? moment(date).format('YYYY-MM-DDTHH:mm:ssZ') : null;
    }
    deserialize(date: string): Date {
        if (date) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
        }

        return undefined;
    }
}

export class DateTimeOffsetConverterWithoutTimeZone implements JsTsCustomConvert<Date> {
    serialize(date: Date): string {
        return date ? moment(date).format('YYYY-MM-DDTHH:mm:ss') : null;
    }
    deserialize(date: string): Date {
        if (date) {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss').toDate();
        }

        return undefined;
    }
}

