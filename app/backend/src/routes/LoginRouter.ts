import { Router } from 'express';
import LoginValidation from '../middleware/LoginValidation';
import LoginController from '../controllers/LoginController';
import TokenValidation from '../middleware/TokenValidation';

const router = Router();
const loginController = new LoginController();

router.post('/', LoginValidation.verify, (req, res) => loginController.login(req, res));
router.get('/role', TokenValidation.verify, (req, res) => LoginController.userRole(req, res));

export default router;
