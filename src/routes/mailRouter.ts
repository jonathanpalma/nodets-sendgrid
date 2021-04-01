import express, { Request, Response } from 'express';
import sgMail from '../services/sendgrid';

const router = express.Router({
  mergeParams: true,
});

router.route('/').post((req: Request, res: Response) => {
  const { body, subject, to } = req.body;
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

export default router;
