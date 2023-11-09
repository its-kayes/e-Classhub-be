import { IAnnouncement } from './announcement.interface';

const CreateAnnouncement = async (announcement: IAnnouncement) => {
  return announcement;
};

export const AnnouncementService = {
  CreateAnnouncement,
};
