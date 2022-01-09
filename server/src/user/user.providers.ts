import { connect } from 'http2';
import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

export const usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
]