const bcrypt = require('bcrypt');
const {
  Model
} = require('../helpers/validate');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: 'UserHasRole',
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'role',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Booking, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'booking',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  User.init({
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  
  return User;
};
