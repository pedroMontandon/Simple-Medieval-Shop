import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginMiddlewares from '../../../src/middlewares/login.middlewares';
import UserModel, { UserSequelizeModel } from '../../../src/database/models/user.model';
import mockedUser from '../../mocks/mockedUser';
import { User } from '../../../src/types/User';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Tries to login without an username', async function () {
    const response = await chai.request(app).post('/login').send({ password: 'typeIt!'})
    expect(response.status).to.eq(400);
  })
  it('Tries to login without a password', async function () {
    const response = await chai.request(app).post('/login').send({ username: 'Rambo'})
    expect(response.status).to.eq(400);
  })
  it('Tries to login with an inexisting user', async function() {
    sinon.stub(UserModel, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send({ username: 'Falcão', password: 'Quando eu viro o meu boné'})
    expect(response.status).to.eq(401)
  })
  // it('Tries to login with an incorrect password', async function () {
  //   const user = UserModel.build(mockedUser);
  // })
});
