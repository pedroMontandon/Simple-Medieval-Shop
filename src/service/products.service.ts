import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

async function createProduct(product: Product): Promise<ServiceResponse<Product>> {
  const { dataValues } = await ProductModel.create(product);
  return { status: 'SUCCESSFUL_CREATION', data: dataValues };
}

async function getAllProducts(): Promise<ServiceResponse<ProductSequelizeModel[]>> {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL_RETRIEVAL', data: products };
}

export default {
  createProduct,
  getAllProducts,
};