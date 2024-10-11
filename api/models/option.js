const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {
      this.belongsTo(models.Hotel, {
        foreignKey: {
          name: 'hotelId',
          allowNull: false,
        },
        as: 'hotel',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.Booking, {
        through: 'BookingHasOption',
        foreignKey: {
          name: 'optionId',
          allowNull: false,
        },
        as: 'booking',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Option.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    availability: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    hotelId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Option',
    tableName: 'option',
  });
  return Option;
};
