import { Router } from 'express';
import { ClassroomController } from './classroom.controller';

const router: Router = Router();

router.post('/create', ClassroomController.CreateClassroom);

router.get('/find/:classCode', ClassroomController.FindClassroom);

export { router as ClassroomRoutes };
