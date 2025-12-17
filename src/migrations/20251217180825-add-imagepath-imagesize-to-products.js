'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'imagePath', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Products', 'imageSize', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'imagePath');
    await queryInterface.removeColumn('Products', 'imageSize');
  },
};
