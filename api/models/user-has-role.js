const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserHasRole extends Model {
    static associate(models) {
      // Définissez les associations avec d'autres modèles ici, le cas échéant
    }
  }
  UserHasRole.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'UserHasRole',
      tableName: 'user_has_role'
    }
  );

  return UserHasRole;
};