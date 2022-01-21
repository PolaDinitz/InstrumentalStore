import { Connection } from 'mongoose';
import { InstrumentSchema } from './instrument.schema';

export const instrumentProviders = [
  {
    provide: 'INSTUMENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', InstrumentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
