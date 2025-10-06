    import { model, Document } from 'mongoose';
    import { deviceSchemaType } from 'types';
    import { deviceSchema} from '../schemas/device-details.js';
    interface UserDocument extends deviceSchemaType, Document {}
    export const Devicedata = model<UserDocument>('Devicedata', deviceSchema);