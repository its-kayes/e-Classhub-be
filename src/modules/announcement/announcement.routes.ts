import { Router } from 'express';
import multer, { memoryStorage } from 'multer';
import { AnnouncementController } from './announcement.controller';

const router: Router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/create',
  upload.fields([{ name: 'materials', maxCount: 2 }]),
  AnnouncementController.CreateAnnouncement,
);

router.get(
  '/classroom/:classCode/:email',
  AnnouncementController.GetAnnouncements,
);

router.delete('/delete', AnnouncementController.DeleteAnnouncement);

export { router as AnnouncementRoutes };
