import { Connection } from 'mongoose';
import { InstrumentSchema } from './instrument.schema';

export const instrumentProviders = [
  {
    provide: 'INSTRUMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Instrument', InstrumentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
