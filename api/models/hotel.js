const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      this.hasMany(models.Room, {
        foreignKey: {
          name: 'hotelId',
          allowNull: false,
        },
        as: 'rooms',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Option, {
        foreignKey: {
          name: 'hotelId',
          allowNull: false,
        },
        as: 'options',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Hotel.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
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
    roomNb: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Hotel',
    tableName: 'hotel',
  });
  return Hotel;
};
