const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'user',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Room, {
        foreignKey: {
          name: 'roomId',
          allowNull: false,
        },
        as: 'room',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.Option, {
        through: 'BookingHasOption',
        foreignKey: {
          name: 'bookingId',
          allowNull: false,
        },
        as: 'option',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Booking.init({
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    cancel: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    peopleNb: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'booking',
  });
  return Booking;
};
