import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import jwtUtils from '../utils/jwt.utils';
import UserModel from '../database/models/user.model';

async function checkToken(token: string): Promise<unknown> {
  try {
    const { id } = jwtUtils.verify(token);
    const findByToken = await OrderModel.findOne({ where: { id } });
    return !!findByToken;
  } catch (e) {
    return false;
  }
}

async function checkUserId(userId: number): Promise<boolean> {
  const order = await UserModel.findOne({ where: { id: userId } });
  return !!order;
}

async function getAllOrders(): Promise<ServiceResponse<OrderSequelizeModel[]>> {
  const orders = await OrderModel.findAll({
    include: [
      { model: ProductModel, as: 'productsIds', attributes: [] },
    ],
    attributes: [
      'id',
      'userId',
      [
        literal('JSON_ARRAYAGG(productsIds.id)'),
        'productIds',
      ],
    ],
    group: ['Order.id'],
  });
  return { status: 'SUCCESSFUL_RETRIEVAL', data: orders };
}

async function createOrder(userId: number, productIds: number[])
  : Promise<ServiceResponse<unknown>> {
  productIds.map(async (productId) => {
    const { dataValues: { id } } = await OrderModel.create({ userId });
    await ProductModel.update({ orderId: id }, { where: { id: productId } });
  });
  return { status: 'SUCCESSFUL_CREATION', data: { userId, productIds } };
}

export default {
  getAllOrders,
  createOrder,
  checkToken,
  checkUserId,
};