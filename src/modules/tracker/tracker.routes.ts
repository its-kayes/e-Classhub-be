import { Router } from 'express';
import { TrackerController } from './tracker.controller';

const router: Router = Router();

router.get('/user-history/:email', TrackerController.GetUserBasedLogHistory);

export { router as TrackerRoutes };
