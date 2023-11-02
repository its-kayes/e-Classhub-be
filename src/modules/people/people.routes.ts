import { Router } from 'express';
import { PeopleController } from './people.controller';

const router: Router = Router();

router.post('/join-classroom', PeopleController.JoinClassroom);

export { router as PeopleRoutes };
