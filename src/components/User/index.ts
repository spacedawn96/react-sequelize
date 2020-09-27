import { Router } from 'express';
import { login, register } from './usersController';
import { protect } from '../../middlewares/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;