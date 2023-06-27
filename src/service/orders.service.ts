import { literal } from 'sequelize';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

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

export default {
  getAllOrders,
};