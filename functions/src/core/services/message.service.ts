import { ENV_KEY } from '../constants';
import { setApiKey } from '@sendgrid/mail';

setApiKey(process.env[ENV_KEY.SEND_GRID_SECRET]);

export class MessageService {
    async meet(): Promise<any> {
        const options = {
            to: '',
            from: 'Ukrainische Kirche <>',
            subject: '',
            html: ''
        };
    }
}

export const contentService = new MessageService();
