'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
      Book.hasMany(models.BookRequest, { foreignKey: 'bookId', as: 'requests' });
    }
  }
  Book.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    condition: { type: DataTypes.ENUM('new','like_new','good','fair','poor'), allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    ownerId: { type: DataTypes.UUID, allowNull: false }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books'
  });
  return Book;
};