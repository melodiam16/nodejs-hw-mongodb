import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: typeList,
      default: 'personal',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const sortByList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
