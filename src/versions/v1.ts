import { Router } from 'express';
import { AnnouncementRoutes } from '../modules/announcement/announcement.routes';
import { ClassroomRoutes } from '../modules/classroom/classroom.routes';
import { HealthCheckRoutes } from '../modules/health-check/healthCheck.routes';
import { PeopleRoutes } from '../modules/people/people.routes';
import { TrackerRoutes } from '../modules/tracker/tracker.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/health-check', HealthCheckRoutes);

router.use('/user', UserRoutes);

router.use('/classroom', ClassroomRoutes);

router.use('/people', PeopleRoutes);

router.use('/tracker', TrackerRoutes);

router.use('/announcement', AnnouncementRoutes);

export { router as v1 };
