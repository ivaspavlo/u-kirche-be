import sgMail from '@sendgrid/mail';
import { logger } from 'firebase-functions/v2';
import { ENV_KEY, ERROR_CODE } from '../constants';
import { IMeetMessage } from '../interfaces';
import { validateMeetMessageData } from '../validators';
import { HttpResponseError } from '../utils';

sgMail.setApiKey(process.env[ENV_KEY.SEND_GRID_SECRET]);

export class MessageService {
    async meet(body: unknown): Promise<object> {
        await validateMeetMessageData(body);
        const meetMessage = body as IMeetMessage;

        const message = {
            to: 'ukrainische.ortodoxe.kirche@gmail.com',
            from: 'Запит з вебсайту <ukrainische.ortodoxe.kirche@gmail.com>',
            subject: `Прохання зустріти: ${meetMessage.name}`,
            html: `
                <h4>Ім'я: ${meetMessage.name}</h4>
                <p>Повідомлення: ${meetMessage.message}</p>
                <p>Мова: ${meetMessage.lang}</p>
                <p>${meetMessage.phone ? 'Телефон: ' + meetMessage.phone : ''}</p>
            `
        };

        try {
            await sgMail.send(message);
            return {};
        } catch (error: any) {
            logger.error(error);
            throw new HttpResponseError(422, ERROR_CODE.UNPROCESSABLE, error);
        }
    }
}

export const messageService = new MessageService();
