'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.createTable('carts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: Sequelize.ENUM('active', 'ordered', 'abandoned'),
    allowNull: false,
    defaultValue: 'active',
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_carts_status;'
    );
  },
};
