const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isType = (contactType) =>
    ['personal', 'home', 'work'].includes(contactType);

  if (isType(contactType)) return contactType;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') return true;
    if (lowerValue === 'false') return false;
  }
  return undefined;
};

export const parseContactFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);
  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
