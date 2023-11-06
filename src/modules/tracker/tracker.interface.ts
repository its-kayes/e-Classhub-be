import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

// Tracker interface
export type ITracker = {
  email: string;
  network: {
    ip: string;
    isp: string;
    connection: string;
    proxy: boolean;
    vpn: boolean;
    tor: boolean;
  };
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: {
    vendor: string;
    model: string;
    type: string;
  };
  cpu: {
    architecture: string;
  };
  location: {
    country: string;
    city: string;
    region: string;
    timezone: string;
    latitude: number;
    longitude: number;
    postal: string;
    org: string;
  };
  _id?: string | ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TrackerModel = Model<ITracker, Record<string, unknown>>;
