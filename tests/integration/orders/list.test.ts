import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import mockedOrders from '../../mocks/mockedOrders';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Listing all orders', async function () {
    const order = OrderModel.build(mockedOrders.mockedOrder)
    sinon.stub(OrderModel, 'findAll').resolves([order])
    const response = await chai.request(app).get('/orders')
    expect(response.status).to.eq(200)
  })
});
