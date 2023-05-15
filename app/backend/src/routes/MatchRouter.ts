import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenValidation from '../middleware/TokenValidation';

const router = Router();

const matchController = new MatchController();
router.get('/', (req, res) => matchController.findAll(req, res));
router.patch(
  '/:id/finish',
  TokenValidation.verify,
  (req, res) => matchController.finishMatch(req, res),
);

export default router;
