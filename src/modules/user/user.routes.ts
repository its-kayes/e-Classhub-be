import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();

router.get('/find-one', UserController.FindUser); // Find One User

router.post('/sign-in', UserController.UserSignIn); // Sign In User //TODO: Validator Middleware

export { router as UserRoutes };
