import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';
import matchMock, { match } from './mock/matchMock';
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

  describe('Cadastrar uma nova partida no banco de dados', () => {
    it('Verifica que não é possível cadastrar sem um token', async () => {
      const response = await chai.request(app)
        .post('/matches');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found');
    });
    it('Verifica que não é possível cadastrar com um token invalido', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'invalid_token');

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token');
    });
    it('Com um token válido, com body inválido', async () => {
      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Bad request' });
    });
    it('Com um token válido, com body válido', async () => {
      sinon
        .stub(Match, 'findOrCreate')
        .resolves([match as unknown as Match, true]);

      const { body, status } = await chai
        .request(app).post('/matches')
        .auth(token, { type: 'bearer' })
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 1,
          awayTeamGoals: 1
        });

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal({
        id: 1,
        inProgress: true,
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 0,
        awayTeamGoals: 0
      });
    });
  });
})