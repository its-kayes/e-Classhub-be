import { IAnnouncement } from './announcement.interface';

const CreateAnnouncement = async (announcement: IAnnouncement) => {
  return await announcement;
};

export const AnnouncementService = {
  CreateAnnouncement,
};
