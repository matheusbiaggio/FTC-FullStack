import { Router } from 'express';
import LoginValidation from '../middleware/LoginValidation';
import LoginController from '../controllers/LoginController';

const router = Router();
const loginController = new LoginController();

router.post('/', LoginValidation.verify, (req, res) => loginController.login(req, res));

export default router;
