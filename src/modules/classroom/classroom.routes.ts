import { Router } from 'express';
import { ClassroomController } from './classroom.controller';

const router: Router = Router();

router.post('/create', ClassroomController.CreateClassroom); // Create Classroom

router.get('/find/:classCode', ClassroomController.FindClassroom); // Find Classroom by classCode

router.get('/mentor/list/:email', ClassroomController.MentorClassroomList); // List all Classrooms (mentor Based);

router.get('/student/list/:email', ClassroomController.StudentClassroomList); // List all Classrooms (student Based);

export { router as ClassroomRoutes };
