exports.getPagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  return { page, limit, offset: (page - 1) * limit };
};
