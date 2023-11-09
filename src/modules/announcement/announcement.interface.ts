import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

export type IAnnouncement = {
  classCode: string;
  date?: Date;
  description?: string;
  materials?: {
    url: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  id?: string | ObjectId;
};

export type AnnouncementModel = Model<IAnnouncement, Record<string, unknown>>;
