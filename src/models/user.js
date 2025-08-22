"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Book, { foreignKey: "ownerId", as: "books" });
      User.hasMany(models.BookRequest, {
        foreignKey: "requesterId",
        as: "requests",
      });
    }
    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      return values;
    }
    async validatePassword(plain) {
      return bcrypt.compare(plain, this.password);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );

  User.addHook("beforeCreate", async (user) => {
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
  });
  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password"))
      user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
