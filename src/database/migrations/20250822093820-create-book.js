'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      condition: {
        type: Sequelize.ENUM('new','like_new','good','fair','poor'),
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      ownerId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addConstraint('Books', {
      fields: ['ownerId'],
      type: 'foreign key',
      name: 'fk_books_owner',
      references: { table: 'Users', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Books', 'fk_books_owner').catch(() => {});
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Books_condition";').catch(() => {});
    await queryInterface.dropTable('Books');
  }
};