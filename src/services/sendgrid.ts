import { config } from 'dotenv';
import sg, { MailDataRequired } from '@sendgrid/mail';

// env
config();

// config
const sgConfig = {
  key: process.env.SENDGRID_API_KEY ?? '',
  sender: process.env.SENDGRID_SENDER ?? '',
};

// api key
sg.setApiKey(sgConfig.key);

const send = (data: Omit<MailDataRequired, 'from'>) =>
  sg.send({ ...data, from: sgConfig.sender } as MailDataRequired);

export default { send };
