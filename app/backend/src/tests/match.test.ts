import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';

import matchMock from './mock/matchMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste do Match', () => {
  afterEach(() => {
    sinon.restore();
  });

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
  })
})