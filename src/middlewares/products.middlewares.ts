import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

function verifyName(name: unknown) {
  if (!name) return { nameStatus: 'INVALID_DATA', nameData: { message: '"name" is required' } };
  if (typeof name !== 'string') {
    return { nameStatus: 'UNPROCESSABLE_ENTITY', nameData: { message: '"name" must be a string' } };
  }
  if (name.length < 3) {
    return { nameStatus: 'UNPROCESSABLE_ENTITY', 
      nameData: { message: '"name" length must be at least 3 characters long' } };
  }
  return { nameStatus: 'SUCCESSFUL_RETRIEVAL' };
}

function verifyPrice(price: unknown) {
  if (!price) return { priceStatus: 'INVALID_DATA', priceData: { message: '"price" is required' } };
  if (typeof price !== 'string') {
    return { priceStatus: 
      'UNPROCESSABLE_ENTITY',
    priceData: { message: '"price" must be a string' } };
  }
  if (price.length < 3) {
    return { priceStatus: 'UNPROCESSABLE_ENTITY', 
      priceData: { message: '"price" length must be at least 3 characters long' } };
  }
  return { priceStatus: 'SUCCESSFUL_RETRIEVAL' };
}

async function verifyProduct(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { name, price } = req.body;
  const { nameStatus, nameData } = verifyName(name);
  const { priceStatus, priceData } = verifyPrice(price);
  if (nameStatus !== 'SUCCESSFUL_RETRIEVAL') {
    return res.status(mapStatusHTTP(nameStatus)).json(nameData);
  }
  if (priceStatus !== 'SUCCESSFUL_RETRIEVAL') {
    return res.status(mapStatusHTTP(priceStatus)).json(priceData);
  }
  
  return next();
}

export default {
  verifyProduct,
};