import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser); // optional login

export default router;
