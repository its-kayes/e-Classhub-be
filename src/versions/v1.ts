import { Router } from 'express';
import { HealthCheckRoutes } from '../modules/health-check/healthCheck.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/health-check', HealthCheckRoutes);

export { router as v1 };
