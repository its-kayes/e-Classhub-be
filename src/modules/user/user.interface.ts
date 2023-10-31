import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

export type IUser = {
  _id?: string | ObjectId;
  name: string;
  email: string;
  password: string;
  type: 'student' | 'mentor';
  isVerified: boolean;
  gender: 'male' | 'female';
  dob?: Date;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: number;
  title?: string;
  profilePicture?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserSignIn = {
  email: string;
  password: string;
};
