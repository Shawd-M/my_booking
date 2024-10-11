module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('booking_has_option', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'booking',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      optionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'option',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    }, {
      timestamps: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('booking_has_option');
  },
};
