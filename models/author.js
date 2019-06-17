'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Author', {
    name: DataTypes.STRING
  }, {});
  Genre.associate = function (models) {
    // associations can be defined here
    this.belongsToMany(models.Book, {
      through: 'BookAuthor'
    });
  };
  return Genre;
};