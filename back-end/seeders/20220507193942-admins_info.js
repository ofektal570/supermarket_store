"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("admins", [
      {
        id: 2,
        email: "ofek570@walla.com",
        password: "ofek123",
        createdAt: "2022-05-07T19:53:07.399Z",
        updatedAt: "2022-05-07T19:53:07.399Z",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("admins", null, {});
  },
};
