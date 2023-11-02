import { Router } from 'express';
import { PeopleController } from './people.controller';

const router: Router = Router();

router.post('/join-classroom', PeopleController.JoinClassroom);

router.get('/requested/:email/:classCode', PeopleController.GetRequestedPeople);

export { router as PeopleRoutes };
