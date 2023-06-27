import { Request, Response } from 'express';
import produtcsService from '../service/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function createProduct(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const { status, data } = await produtcsService.createProduct({ name, price, orderId });
  return res.status(mapStatusHTTP(status)).json(data);
}

async function getAllProducts(req: Request, res: Response): Promise<Response> {
  const { status, data } = await produtcsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
}

export default {
  createProduct,
  getAllProducts,
};