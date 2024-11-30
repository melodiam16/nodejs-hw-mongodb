import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();

  // const skip = (page - 1) * perPage;
  // const query = ContactCollection.find()
  //   .skip(skip)
  //   .limit(perPage)
  //   .sort({ [sortBy]: sortOrder });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  // const data = await query;

  // const totalItems = await ContactCollection.find()
  //   .merge(query)
  //   .countDocuments();

  const paginationData = calculatePaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};
export const getContactsById = (id) => ContactCollection.findById(id);

export const addContact = (peyload) => ContactCollection.create(peyload);

export const updateContact = async ({ _id, peyload, options = {} }) => {
  const updatedContact = await ContactCollection.findOneAndUpdate(
    { _id },
    peyload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!updatedContact || !updatedContact.value) return null;

  return {
    contact: updatedContact.value,
    isNew: Boolean(updatedContact?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (filter) =>
  ContactCollection.findOneAndDelete(filter);
