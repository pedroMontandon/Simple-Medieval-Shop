import { describe } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import { mockedProducts } from '../../mocks/mockedProducts';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Happy case: getting all products', async function () {
    const mockedProductsList = ProductModel.build(mockedProducts[0])
    sinon.stub(ProductModel, 'findAll').resolves([mockedProductsList])
    const response = await chai.request(app).get('/products')
    expect(response.status).to.eq(200)
  })
});
