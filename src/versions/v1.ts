import { Router } from 'express';
import { HealthCheckRoutes } from '../modules/health-check/healthCheck.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/health-check', HealthCheckRoutes);

router.use('/user', UserRoutes);

export { router as v1 };
