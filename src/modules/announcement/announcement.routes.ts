import { Router } from 'express';
import { AnnouncementController } from './announcement.controller';

const router: Router = Router();

router.post('/create', AnnouncementController.CreateAnnouncement);

export { router as AnnouncementRoutes };
