import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();

router.get('/find-one', UserController.FindUser); // Find One User

router.post('/sign-up', UserController.UserSignUp); // Sign In User //TODO: Validator Middleware

router.post('/sign-in', UserController.UserSignIn); // Sign Up User

router.patch('/update-name-title/:email', UserController.UpdateNameTitle); // Update Name and Title

export { router as UserRoutes };
