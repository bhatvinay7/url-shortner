    import { model} from 'mongoose';
    import {userSchema} from '../schemas/user_schema.js'
    import {user_document} from 'types'
    export const User = model<user_document>('User', userSchema);