import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

// Tracker interface
export type ITracker = {
  email: string;
  network: INetwork;
  browser: IBrowser;
  engine: IEngine;
  os: IOs;
  device: IDevice;
  cpu: ICpu;
  location: ILocation;
  _id?: string | ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TrackerModel = Model<ITracker, Record<string, unknown>>;

export type INetwork = {
  ip: string;
  isp: string;
  connection: string;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
};

export type IBrowser = {
  name: string;
  version: string;
  major: string;
};

export type IEngine = {
  name: string;
  version: string;
};

export type ILocation = {
  country: string;
  city: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  postal: string;
  org: string;
};

export type IDevice = {
  vendor: string;
  model: string;
  type: string;
};

export type IOs = {
  name: string;
  version: string;
};

export type ICpu = {
  architecture: string;
};
