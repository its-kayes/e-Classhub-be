import { Router } from 'express';
import { UserController } from './user.controller';

const router: Router = Router();

router.get('/find-one', UserController.FindUser);

export { router as UserRoutes };
