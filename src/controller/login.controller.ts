import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import loginService from '../service/login.service';

async function login(req: Request, res: Response): Promise<Response> {
  const { username, password } = req.body;
  const { status, data } = await loginService.login(username, password);
  if (status !== 'SUCCESSFUL_RETRIEVAL') return res.status(mapStatusHTTP(status)).json(data);
  return res.status(mapStatusHTTP(status)).json({ token: data });
}

export default {
  login,
};