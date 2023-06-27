import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import jwtUtil from '../utils/jwt.utils';

function generateToken(username: string, id: number): string {
  return jwtUtil.sign({ id, username });
}

async function login(username: string, password: string): Promise<ServiceResponse<string>> {
  const user = await UserModel.findOne({ where: { username } });
  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const token = generateToken(username, user.dataValues.id);
  return { status: 'SUCCESSFUL_RETRIEVAL', data: token };
}

export default {
  login,
};