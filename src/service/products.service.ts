import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function createProduct(product: Product): Promise<ServiceResponse<Product>> {
  const { dataValues } = await ProductModel.create(product);
  console.log(dataValues);
  return { status: 'SUCCESSFUL_CREATION', data: dataValues };
}

export default {
  createProduct,
};