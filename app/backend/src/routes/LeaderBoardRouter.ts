import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', (req, res) => leaderBoardController.generateBoard(req, res));

export default router;
