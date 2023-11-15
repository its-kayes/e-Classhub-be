import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

export type IAnnouncement = {
  classCode: string;
  date?: Date;
  description?: string | null;
  materials?:
    | {
        url: string;
      }[]
    | null;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string | ObjectId;
  email?: string;
};

export type AnnouncementModel = Model<IAnnouncement, Record<string, unknown>>;
