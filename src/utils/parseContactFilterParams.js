const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['personal', 'home', 'work'].includes(type);

  if (isType(type)) return type;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true') return true;
    if (lowerValue === 'false') return false;
  }
  return undefined;
};

export const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);
  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
