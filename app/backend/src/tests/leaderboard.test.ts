import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teamMock } from './mock/teamMock';
import matchMock from './mock/matchMock';
import leaderboardMock from './mock/leaderboardMock';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint /leaderboard', () => {
  let modelLeaderboardStub: sinon.SinonStub;

  afterEach(() => {
    sinon.restore();
  });

  describe('Verifica a lógica do /leaderboard/home', () => {
    it('Verifica se retorna o array correto', async () => {
      modelLeaderboardStub = sinon.stub(Match, 'findAll')
        .resolves(matchMock as unknown as Match[]);

      modelLeaderboardStub = sinon.stub(Team, 'findAll')
        .resolves(teamMock as unknown as Team[]);

      const response = await chai.request(app)
        .get('/leaderboard/home')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(leaderboardMock);
      console.log('oi')
    });
  })
});