import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import jwtUtils from '../../../src/utils/jwt.utils';
import ordersService from '../../../src/service/orders.service';
import UserModel from '../../../src/database/models/user.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Failing to create an order without a token', async function() {
    const response = await chai.request(app).post('/orders')
      .send({userId: 1, productIds: [2] });
    expect(response.status).to.eq(401)
    expect(response.body).to.deep.eq({ message: 'Token not found' });
  })
  it('Failing to create an order using a wrong token', async function () {
    sinon.stub(OrderModel, 'findOne').resolves(null);
    const response = await chai.request(app).post('/orders')
      .send({ userId: 1, productIds: [2] }).set('Authorization', 'Oi!');
    expect(response.status).to.eq(401);
    expect(response.body).to.deep.eq({ message: 'Invalid token' });
  })
  it('Failing to create an order without an userId', async function(){
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 3 })
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'})
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    const response = await chai.request(app).post('/orders')
      .send({ productIds: [2] }).set('Authorization', 'validToken')
    expect(response.status).to.eq(400);
    expect(response.body).to.deep.eq({ message: '"userId" is required'});
  })
  it('Failing to create an order using a typed string "userId"', async function() {
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 3 })
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'})
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    const response = await chai.request(app).post('/orders')
      .send({ userId: 'oi!', productIds: [2] }).set('Authorization', 'validToken')
    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({ message: '"userId" must be a number'});
  })
  it('Failing to create an order using a nonexistent "userId"', async function(){
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 3 })
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'})
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    sinon.stub(UserModel, 'findOne').resolves(null)
    const response = await chai.request(app).post('/orders')
      .send({ userId: 1, productIds: [2] }).set('Authorization', 'validToken')
    expect(response.status).to.eq(404);
    expect(response.body).to.deep.eq({ message: '"userId" not found'});
  })
  it('Failing to create an order without a productId', async function() {
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 1 })
    const userMockModel = UserModel.build({username: 'Chapolin', vocation: 'herói', level: 2, password: 'oi'})
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'})
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    sinon.stub(UserModel, 'findOne').resolves(userMockModel)
    const response = await chai.request(app).post('/orders')
      .send({ userId: 1 }).set('Authorization', 'validToken')
    expect(response.status).to.eq(400);
    expect(response.body).to.deep.eq({ message: '"productIds" is required'});
  })
  it('Failing to create an order using a typed string in the array productId', async function() {
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 1 })
    const userMockModel = UserModel.build({username: 'Chapolin', vocation: 'herói', level: 2, password: 'oi'})
    sinon.stub(UserModel, 'findOne').resolves(userMockModel)
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'})
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    const response = await chai.request(app).post('/orders')
      .send({ userId: 1, productIds: [] }).set('Authorization', 'validToken')
    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({ message: '"productIds" must include only numbers'});
  })
  it('Failing to create an order passing a number for productIds', async function() {
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 1 })
    const userMockModel = UserModel.build({username: 'Chapolin', vocation: 'herói', level: 2, password: 'oi'})
    sinon.stub(UserModel, 'findOne').resolves(userMockModel)
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'})
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    const response = await chai.request(app).post('/orders')
      .send({ userId: 1, productIds: 1 }).set('Authorization', 'validToken')
    expect(response.status).to.eq(422);
    expect(response.body).to.deep.eq({ message: '"productIds" must be an array'});
  })
  it('Creating an order', async function () {
    const tokenModelMocked = OrderModel.build({ id: 1, userId: 1 })
    const userMockModel = UserModel.build({username: 'Chapolin', vocation: 'herói', level: 2, password: 'oi'})
    sinon.stub(jwtUtils, 'verify').returns({id: 1, username: 'Chapolin'});
    sinon.stub(UserModel, 'findOne').resolves(userMockModel);
    sinon.stub(OrderModel, 'findOne').resolves(tokenModelMocked);
    sinon.stub(OrderModel, 'create').resolves(tokenModelMocked);
    sinon.stub(ProductModel, 'update').resolves();
    const response = await chai.request(app).post('/orders')
      .send({ userId: 1, productIds: [2] }).set('Authorization', 'validToken');
    expect(response.status).to.eq(201);
    expect(response.body).to.deep.eq({ userId: 1, productIds: [2] });
  });
});
