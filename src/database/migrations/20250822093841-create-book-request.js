'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BookRequests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      status: {
        type: Sequelize.ENUM('pending','accepted','declined'),
        allowNull: false,
        defaultValue: 'pending'
      },
      bookId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      requesterId: {
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

    await queryInterface.addConstraint('BookRequests', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'fk_bookrequests_book',
      references: { table: 'Books', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('BookRequests', {
      fields: ['requesterId'],
      type: 'foreign key',
      name: 'fk_bookrequests_requester',
      references: { table: 'Users', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('BookRequests', 'fk_bookrequests_book').catch(() => {});
    await queryInterface.removeConstraint('BookRequests', 'fk_bookrequests_requester').catch(() => {});
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_BookRequests_status";').catch(() => {});
    await queryInterface.dropTable('BookRequests');
  }
};