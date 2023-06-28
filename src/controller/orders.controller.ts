import { Request, Response } from 'express';
import ordersService from '../service/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAllOrders(req: Request, res: Response): Promise<Response> {
  const { status, data } = await ordersService.getAllOrders();
  return res.status(mapStatusHTTP(status)).json(data);    
}

async function createOrder(req: Request, res: Response): Promise<Response> {
  const { productIds, userId } = req.body;
  const { status, data } = await ordersService.createOrder(userId, productIds);
  return res.status(mapStatusHTTP(status)).json(data);
}

export default {
  getAllOrders,
  createOrder,
};