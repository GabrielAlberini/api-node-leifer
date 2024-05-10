const throwError = (message, name, status, issues) => {
  const error = Object.assign(new Error(message), { name, status, issues });
  throw error;
};

export { throwError };
