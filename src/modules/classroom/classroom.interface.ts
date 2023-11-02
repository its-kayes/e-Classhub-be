import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

export type IClassroom = {
  className: string;
  shortTile: string;
  classCode: string;
  mentorEmail: string;
  mentorName: string;
  status: 'active' | 'deactivated' | 'deleted' | 'archived';
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string | ObjectId;
};

export type ClassroomModel = Model<IClassroom, Record<string, unknown>>;

export type ICreateClassroom = {
  className: string;
  shortTile: string;
  mentorEmail: string;
  mentorName: string;
};

export type IClassroomResponse = {
  className: string;
  shortTile: string;
  classCode: string;
  mentorName: string;
  mentorEmail?: string;
};
