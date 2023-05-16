import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { adminMock, messageFieldsUnfilled, messageInvalidFields, userInvalidMock } from './mock/userMock';
import User from '../database/models/User';

import { app } from '../app';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste para o /login', () => {
  let modelUserStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  describe('Verifica a lógica do login', () => {
    it('Não é possível fazer o login sem usuário', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          password: adminMock.password,
        });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(messageFieldsUnfilled);
    });
    it('Não é possível fazer o login sem senha', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: adminMock.email,
        });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal(messageFieldsUnfilled);
    });
    it('Não é possível fazer o login com usuário e senha não cadastrado', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: userInvalidMock.email,
          password: userInvalidMock.password,
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(messageInvalidFields);
    });
    it('Não é possível fazer o login com usuário e senha inválido', async () => {
      modelUserStub = sinon.stub(User, 'findOne')
        .resolves(userInvalidMock as unknown as User);

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'testeteste.cm',
          password: '123',
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal(messageInvalidFields);
    });
    it('Verifica se possível fazer um login com sucesso', async () => {
      modelUserStub = sinon.stub(User, 'findOne')
        .resolves(adminMock as unknown as User);

      const response = await chai.request(app)
        .post('/login')
        .send({
          email: adminMock.email,
          password: adminMock.password,
        });

      expect(response.status).to.be.equal(200);
      expect(response.body.token).not.to.be.empty;
    });
  });

  describe('Verifica a lógica do login/role', () => {
    it('Não é possível acessar o login/role sem token', async () => {
      const response = await chai.request(app)
        .get('/login/role');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Não é possível acessar o login/role sem token autorizado', async () => {
      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Possível acessar o login/role com token autorizado', async () => {
      const tokenJWT = new JWT().generateToken({
        email: 'admin@admin.com',
        role: 'admin',
        });

      const response = await chai.request(app)
        .get('/login/role')
        .set('Authorization', tokenJWT);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ "role": "admin" });
    });
  });
});