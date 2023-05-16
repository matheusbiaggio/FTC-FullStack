import { Router } from 'express';
import TeamRouter from './TeamRouter';
import LoginRouter from './LoginRouter';
import MatchRouter from './MatchRouter';
import LeaderBoard from './LeaderBoardRouter';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderBoard);

export default router;
