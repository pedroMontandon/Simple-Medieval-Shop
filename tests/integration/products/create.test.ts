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
  it('Creating a product', async function () {
    const mockedProduct = ProductModel.build(newMockedProduct)
    sinon.stub(ProductModel, 'create').resolves(mockedProduct)
    const response = await chai.request(app).post('/products')
    .send({ name: "Martelo de Thor", price: "30 peças de ouro", orderId: 4 })
    expect(response.status).to.eq(201)
  })
  it('Trying to create a product without a name', async function () {
    const response = await chai.request(app).post('/products')
    .send({ price: 'um milhão' })
    expect(response.status).to.eq(400);
  })
  it('Trying to create a product using a Number in "name"', async function () {
    const response = await chai.request(app).post('/products')
    .send({ name: 1, price: 'um milhão' })
    expect(response.status).to.eq(422);
  })
  it('Trying to create a product using "name" with 2 characters', async function () {
    const response = await chai.request(app).post('/products')
    .send({ name: 'oi', price: 'um milhão' })
    expect(response.status).to.eq(422);
  })
  it('Trying to create a product without a price', async function () {
    const response = await chai.request(app).post('/products')
    .send({ name: 'martelo do chapolin' })
    expect(response.status).to.eq(400);
  })
  it('Trying to create a product using a Number in "price"', async function () {
    const response = await chai.request(app).post('/products')
    .send({ name: 'martelo do chapolin', price: 43 })
    expect(response.status).to.eq(422);
  })
  it('Trying to create a product using "price" with 2 characters', async function () {
    const response = await chai.request(app).post('/products')
    .send({ name: 'martelo do chapolin', price: 'ã?' })
    expect(response.status).to.eq(422);
  })
});
