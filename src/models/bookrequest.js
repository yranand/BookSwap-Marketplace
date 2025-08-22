'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRequest extends Model {
    static associate(models) {
      BookRequest.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
      BookRequest.belongsTo(models.User, { foreignKey: 'requesterId', as: 'requester' });
    }
  }
  BookRequest.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    status: { type: DataTypes.ENUM('pending','accepted','declined'), defaultValue: 'pending' },
    bookId: { type: DataTypes.UUID, allowNull: false },
    requesterId: { type: DataTypes.UUID, allowNull: false }
  }, {
    sequelize,
    modelName: 'BookRequest',
    tableName: 'BookRequests'
  });
  return BookRequest;
};