    import { model, Document } from 'mongoose';
    import {userSchema} from '../schemas/user_schema.js'
    import {userSchemaType} from 'types'
    interface UserDocument extends userSchemaType, Document {}

    export const User = model<UserDocument>('User', userSchema);