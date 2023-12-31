import { Router } from 'express';
import { PeopleController } from './people.controller';

const router: Router = Router();

router.post('/join-classroom', PeopleController.JoinClassroom); // Request to join a Classroom

router.get(
  '/classroom/:status/:email/:classCode',
  PeopleController.GetRequestedPeople,
); // Get Classroom & status based People list for a Classroom

router.patch('/change-status', PeopleController.ChangeStatus);

export { router as PeopleRoutes };
