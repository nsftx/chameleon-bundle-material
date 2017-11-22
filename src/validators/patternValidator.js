export default (definition, value, pattern) => {
  const isValidPattern = value && pattern && new RegExp(pattern).test(value);
  return isValidPattern ? true : definition.message;
};
