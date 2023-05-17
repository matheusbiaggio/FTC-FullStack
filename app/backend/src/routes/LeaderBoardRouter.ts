import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', (req, res) => leaderBoardController.generateBoardHome(req, res));
router.get('/away', (req, res) => leaderBoardController.generateBoardAway(req, res));

export default router;
