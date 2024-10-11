const { Op } = require('sequelize');
const { Room } = require('../models');

module.exports = {

  Create: async (data) => {
    const [room, created] = await Room.findOrCreate({
      where: data,
      defaults: data,
    });
    return [room, created];
  },

  Read: async (id) => {
    const room = await Room.findOne({
      where: {
        id,
      },
    });

    return room;
  },

  ReadByHotel: async (id) => {
    const room = await Room.findAll({
      where: {
        hotelId: id,
      },
    });

    return room;
  },

  Update: async (req, data) => {
    const [isUpdated] = await Room.update(data, {
      where: {
        id: req.roomId,
        hotelId: req.id
      },
    });

    return !!isUpdated;
  },
};
