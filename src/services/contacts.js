import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactsById = (contactId) =>
  ContactCollection.findById(contactId);

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
