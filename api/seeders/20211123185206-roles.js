const names = ['Admin', 'User',];

module.exports = {
  /**
   * Create default roles to start in seeders
   * @param queryInterface
   * @returns {Promise<Object | number>}
   */
  up: async (queryInterface) => queryInterface.bulkInsert('role',
    await Promise.all(names.map(async (name, i) => ({
      id: i + 1,
      name,
    }))), {
      updateOnDuplicate: ['id', 'name'],
      ignoreDuplicates: true,
    }),
  /**
   * Cancel the addition of the data above
   * @param queryInterface
   * @returns {Promise<Object>}
   */
  down: (queryInterface) => queryInterface.bulkDelete('role', null, {}),
};
