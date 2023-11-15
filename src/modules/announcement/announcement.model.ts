import { Schema, model } from 'mongoose';
import { AnnouncementModel, IAnnouncement } from './announcement.interface';

const announcementSchema = new Schema<IAnnouncement>(
  {
    classCode: {
      type: String,
      required: [true, 'Class code is must required'],
      minlength: [14, 'Class code must be at least 14 characters long'],
      maxlength: [14, 'Class code must be at most 14 characters long'],
    },
    date: {
      type: Date,
      required: [true, 'Date is must required'],
      default: Date.now,
    },
    description: String,
    materials: [
      {
        url: String,
      },
    ],
    email: {
      type: String,
      required: [true, 'Email is must required'],
    },
  },
  { timestamps: true },
);

export const Announcement = model<IAnnouncement, AnnouncementModel>(
  'announcement',
  announcementSchema,
);
