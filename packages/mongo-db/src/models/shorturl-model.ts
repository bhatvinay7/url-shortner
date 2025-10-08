    import { model} from 'mongoose';
    import { url_document } from 'types';
    import { urlSchema} from '../schemas/shorturl-schem.js';
    export const Url = model<url_document >('Url', urlSchema);