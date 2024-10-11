const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
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
    }
  }
  Room.init({
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    capacity: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    modelName: 'Room',
    tableName: 'room',
  });
  return Room;
};
