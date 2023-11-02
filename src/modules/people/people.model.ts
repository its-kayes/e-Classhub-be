import { Schema, model } from 'mongoose';
import { IPeople, PeopleModel } from './people.interface';

const peopleSchema = new Schema<IPeople>(
  {
    classCode: {
      type: String,
      required: [true, 'Class code is must required'],
      minlength: [14, 'Class code must be at least 14 characters long'],
      maxlength: [14, 'Class code must be at most 14 characters long'],
      validate: {
        validator: function (v: string) {
          return /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid class code address!`,
      },
    },
    requestEmail: {
      type: String,
      required: [true, 'Requested email is must required'],
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
    },
    status: {
      type: String,
      required: [true, 'Status is must required'],
      enum: ['pending', 'reject', 'block', 'approved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Classroom = model<IPeople, PeopleModel>('people', peopleSchema);
