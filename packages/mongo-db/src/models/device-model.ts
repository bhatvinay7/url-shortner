    import { model} from 'mongoose';
    import { device_document } from 'types';
    import { deviceSchema} from '../schemas/device-details.js';
    export const Devicedata = model<device_document>('Devicedata', deviceSchema);