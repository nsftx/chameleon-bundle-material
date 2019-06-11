export default (config, value, limit) => {
  const isInRange = Number(value) >= limit;
  return isInRange ? true : config.message;
};
