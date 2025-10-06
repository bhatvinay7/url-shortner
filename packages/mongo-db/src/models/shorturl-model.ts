    import { model, Document } from 'mongoose';
    import { urlSchemaType } from 'types';
    import { urlSchema} from '../schemas/shorturl-schem.js';
    interface UserDocument extends urlSchemaType, Document {}
    export const Url = model<UserDocument>('Url', urlSchema);