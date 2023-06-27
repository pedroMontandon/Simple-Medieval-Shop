import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import { newMockedProduct } from '../../mocks/mockedProducts';
import produtcsService from '../../../src/service/products.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Happy Case', async function () {
    const mockedProduct = ProductModel.build(newMockedProduct);
    sinon.stub(ProductModel, 'create').resolves(mockedProduct);

    const result = await produtcsService
  })
});
