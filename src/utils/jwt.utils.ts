import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload {
  const bearerAndToken = token.split(' ');
  const decoded = jwt.verify(bearerAndToken[1], secret) as TokenPayload;
  return decoded;
}

export default {
  sign,
  verify,
  secret,
};