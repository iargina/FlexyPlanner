import qs from 'query-string';
export const stringifyOrder = orderBody => {
  const order = Object.entries(orderBody).reduce((acc, [key, value]) => {
    acc[key] = JSON.stringify(value);
    return acc;
  }, {});
  return qs.stringify(order);
};

export const parseOrder = order => {
  const parsedOrder = qs.parse(order);
  return Object.entries(parsedOrder).reduce((acc, [key, value]) => {
    acc[key] = JSON.parse(value);
    return acc;
  }, {});
};
