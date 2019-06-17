'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Book.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Author, {
      through: 'BookAuthor'
    });
  };
  return Book;
};