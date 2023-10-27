import { Router } from 'express';
import { HealthCheckController } from './healthCheck.controller';
const router: Router = Router();

router.get('/get', HealthCheckController.Get);

export { router as HealthCheckRoutes };
