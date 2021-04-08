import express, { Request, Response } from 'express';
import { simpleParser } from 'mailparser';
import multer from 'multer';
import sgMail from '../services/sendgrid';

const upload = multer();
const router = express.Router({
  mergeParams: true,
});

router.route('/').post((req: Request, res: Response) => {
  console.log({ body: req.body });
  const { body, subject, to } = req?.body || {};
  if (!body || !subject || !to) return res.status(400).send();

  sgMail
    .send({
      to,
      subject,
      html: body,
    })
    .then((response) => {
      console.log({ response });
      return res.json({ status: 'OK' });
    })
    .catch((error) => {
      console.error({ error });
      return res.status(500).send();
    });
});

router
  .route('/inbound')
  .post(upload.any(), async (req: Request, res: Response) => {
    const parsedEmail = await simpleParser(req.body.email);

    console.log('subject', parsedEmail.subject);
    console.log('from', parsedEmail.from);
    console.log('to', parsedEmail.to);
    console.log('cc', parsedEmail.cc);
    console.log('bcc', parsedEmail.bcc);
    console.log('date', parsedEmail.date);
    console.log('messageId', parsedEmail.messageId);
    console.log('inReplyTo', parsedEmail.inReplyTo);
    console.log('replyTo', parsedEmail.replyTo);
    console.log('references', parsedEmail.references);
    console.log('html', parsedEmail.html);
    console.log('text', parsedEmail.text);
    console.log('textAsHtml', parsedEmail.textAsHtml);
    console.log('attachments', parsedEmail.attachments);

    return res.json({ status: 'ok' });
  });

export default router;
