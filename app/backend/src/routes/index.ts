import { Router } from 'express';
import TeamRouter from './TeamRouter';
import LoginRouter from './LoginRouter';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', LoginRouter);

export default router;
