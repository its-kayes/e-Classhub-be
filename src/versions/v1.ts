import { Router } from 'express';
import { HealthCheckRoutes } from '../modules/health-check/healthCheck.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ClassroomRoutes } from '../modules/classroom/classroom.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/health-check', HealthCheckRoutes);

router.use('/user', UserRoutes);

router.use('/classroom', ClassroomRoutes);

export { router as v1 };
