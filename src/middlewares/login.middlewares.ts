import { NextFunction, Request, Response } from 'express';

async function verifyLogin(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  return next();
}

export default {
  verifyLogin,
};