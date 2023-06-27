import { describe } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import { newMockedProduct } from '../../mocks/mockedProducts';


chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Happy case: creating a product', async function () {
    const mockedProduct = ProductModel.build(newMockedProduct)
    sinon.stub(ProductModel, 'create').resolves(mockedProduct)
    const response = await chai.request(app).post('/products')
    .send({ name: "Martelo de Thor", price: "30 peças de ouro", orderId: 4 })
    expect(response.status).to.eq(201)
  })
});
