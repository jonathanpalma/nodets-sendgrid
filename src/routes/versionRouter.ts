import express, { Request, Response } from 'express';

const pkg = require('../../package.json');

const router = express.Router({
  mergeParams: true,
});

router.route('/').get((_req: Request, res: Response) => {
  res.json({ version: pkg.version });
});

export default router;
