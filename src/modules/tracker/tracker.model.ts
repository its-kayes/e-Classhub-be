import { Schema, model } from 'mongoose';
import { ITracker, TrackerModel } from './tracker.interface';

const trackerSchema = new Schema<ITracker>(
  {
    email: {
      type: String,
      required: [true, 'Email is must required'],
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
    },
    network: {
      ip: {
        type: String,
      },
      isp: {
        type: String,
      },
      connection: {
        type: String,
      },
      proxy: {
        type: Boolean,
      },
      vpn: {
        type: Boolean,
      },
      tor: {
        type: Boolean,
      },
    },
    browser: {
      name: {
        type: String,
      },
      version: {
        type: String,
      },
      major: {
        type: String,
      },
    },
    engine: {
      name: {
        type: String,
      },
      version: {
        type: String,
      },
    },
    os: {
      name: {
        type: String,
      },
      version: {
        type: String,
      },
    },
    device: {
      vendor: {
        type: String,
      },
      model: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    cpu: {
      architecture: {
        type: String,
      },
    },
    location: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      region: {
        type: String,
      },
      timezone: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      postal: {
        type: String,
      },
      org: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Tracker = model<ITracker, TrackerModel>('tracker', trackerSchema);
