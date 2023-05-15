import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';
import matchMock from './mock/matchMock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;


describe('Teste do Match', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  const jwt = new JWT();
  const token = jwt.generateToken({ id: 1, email: 'admin@admin.com' });

  describe('findAll sem filtro', () => {
    beforeEach(() => {
      sinon
        .stub(Match, "findAll")
        .resolves([] as unknown as Match[]);
    });

    it('Retorna o array vazio, quando não existe nada no banco', async () => {
      const { body, status } = await chai.request(app).get('/matches');

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
        expect(body).to.be.deep.equal([]);
    })

    it('Retorna um array com todas as partidas', async () => {
      const { body, status } = await chai
        .request(app).get('/matches');

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
        expect(body).to.be.deep.equal(matchMock);
    })

    it('Retorna um array com todas as partidas em progresso quando passado via query', async () => {
      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchMock[1]);
    });

    it('Retorna um array com todas as partidas que não estão em progresso quando passado via query', async () => {
      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchMock[0]);
    });
  })

  describe('findAll com filtro', () => {
    it('Verifica que não é possível alterar o estado da partida sem um token', async () => {
      const response = await chai.request(app).patch('/matches/2/finish');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });

    it('Verifica que não é possível alterar o estado da partida com um token invalido', async () => {
      const response = await chai.request(app)
        .patch('/matches/2/finish')
        .set('Authorization', 'invalid');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });

    it('Verifica que é possível alterar o estado da partida com um token valido', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

      const { body, status } = await chai
        .request(app).patch('/matches/2')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamGoals: 2,
          awayTeamGoals: 0
        });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal({ message: 'Finished' });
    });
  })

  describe('Update passando o id por url e homeTeamGoals e awayTeamGoals no body', () => {
    it('Verifica que não é possível alterar o estado da partida sem um token', async () => {
      const response = await chai.request(app)
        .patch('/matches/1');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Verifica que não é possível alterar o estado da partida com um token invalido', async () => {
      const response = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Com um token válido, retorna o resultado parcial da partida', async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);

      const { body, status } = await chai
        .request(app).patch('/matches/1')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamGoals: 2,
          awayTeamGoals: 0
        });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal({ message: 'Update' });
    });
  });
})