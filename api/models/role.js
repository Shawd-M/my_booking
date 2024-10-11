const {
    Model,
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
      static associate(models) {
        this.belongsToMany(models.User, {
          through: 'UserHasRole',
          foreignKey: {
            name: 'roleId',
            allowNull: false,
          },
          as: 'user',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        });
      }
    }
    Role.init({
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
      modelName: 'Role',
      tableName: 'role',
    });
    return Role;
  };
  