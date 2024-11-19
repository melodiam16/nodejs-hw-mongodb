import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  if (filter.type) {
    query.where('type').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    query.where('isFavourite').equals(filter.isFavourite);
  }

  const data = await query;

  const totalItems = await ContactCollection.find()
    .merge(query)
    .countDocuments();
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
