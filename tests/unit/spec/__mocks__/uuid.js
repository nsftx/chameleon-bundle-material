let mockUid = 0;
// We need to set uuid to predictable values
module.exports = {
  v4: jest.fn(() => {
    mockUid += 1;
    return mockUid;
  }),
};
