import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const expectedTeams = [
  { id: 1, name: 'Team A' },
  { id: 2, name: 'Team B' },
  { id: 3, name: 'Team C' },
];

describe('Teste do Team', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getAll', () => {
    describe('Dado um banco vazio', () => {
      beforeEach(() => {
        sinon
          .stub(Team, "findAll")
          .resolves([] as unknown as Team[]);
      });

      it('retorn um array vazio', async () => {
        const { body, status } = await chai.request(app).get('/teams');

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
        expect(body).to.be.deep.equal([]);
      })

    })
    describe('Dado um banco preenchido', () => {
      beforeEach(() => {
        sinon
          .stub(Team, "findAll")
          .resolves(expectedTeams as unknown as Team[]);
      });

      it('retorna um array com todos os times', async () => {
        const { body, status } = await chai
        .request(app).get('/teams');

        expect(status).to.be.equal(200);
        expect(body).to.be.an('array');
        expect(body).to.be.deep.equal(expectedTeams);
      })
    })
  })

  describe('findById', async () => {
    it('Retorna o time se passar o id válido', async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(expectedTeams[0] as unknown as Team);

      const { body, status } = await chai
        .request(app).get('/teams/1');

      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal(expectedTeams[0]);
    });

    it('Se passado um id inválido, response com status 404 e Team not found', async () => {
      sinon
        .stub(Team, "findByPk")
        .resolves(null);

      const { body, status } = await chai
        .request(app).get('/teams/3');

      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Team not found' });
    })
  });
  afterEach(sinon.restore)
})