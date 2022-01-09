import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('mongodb+srv://Admin:admin@instrumentalstore.lga2g.mongodb.net/store?retryWrites=true&w=majority'),
    },
];