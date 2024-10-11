const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookingHasOption extends Model {
    static associate(models) {
      // Définissez les associations avec d'autres modèles ici, le cas échéant
    }
  }
  BookingHasOption.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      optionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'BookingHasOption',
      tableName: 'booking_has_option'
    }
  );

  return BookingHasOption;
};