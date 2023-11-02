import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

export type IPeople = {
  classCode: string;
  requestEmail: string;
  status?: 'pending' | 'block' | 'joined';
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string | ObjectId;
};

export type PeopleModel = Model<IPeople, Record<string, unknown>>;
