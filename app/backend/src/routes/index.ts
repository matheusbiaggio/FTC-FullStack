import { Router } from 'express';
import TeamRouter from './TeamRouter';

const router = Router();

router.use('/teams', TeamRouter);

export default router;
