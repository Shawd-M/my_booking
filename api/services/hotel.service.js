const { Op } = require('sequelize');
const { Hotel } = require('../models');

module.exports = {

  Create: async (data) => {
    const [hotel, created] = await Hotel.findOrCreate({
      where: data,
      defaults: data,
    });
    return [hotel, created];
  },

  Read: async (id) => {
    const hotel = await Hotel.findOne({
      include: [
        {
          association: 'rooms',
        },
        {
          association: 'options',
        }
      ],
      where: {
        id,
      },
    });

    return hotel;
  },

  Update: async (id, data) => {
    const [isUpdated] = await Hotel.update(data, {
      where: {
        id,
      },
    });

    return !!isUpdated;
  },

  ReadAll: async () => {
    const hotels = await Hotel.findAll(
      {
        include: [
          {
            association: 'rooms',
          },
          {
            association: 'options',
          }
        ],
      },
    );
    return hotels;
  },
};
