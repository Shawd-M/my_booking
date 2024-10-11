const { Op } = require('sequelize');
const { Booking, BookingHasOption } = require('../models');
const moment = require('moment');

module.exports = {

  Create: async (data) => {
    console.log(data)
    const [booking, created] = await Booking.findOrCreate({
      where: data,
      defaults: data,
    });
    return [booking, created];
  },

  existingBooking: async (data) => {
    const booking = await Booking.findOne({
      where: {
        roomId: data.roomId,
        startDate: {
          [Op.lte]: moment(data.endDate).toDate(),
        },
        endDate: {
          [Op.gte]: moment(data.startDate).toDate(),
        },
        cancel: {
          [Op.is]: null,
        },
      },
    });
    return booking;
  },

  setOptions: async (data, id) => {
    data.forEach(async (element) => {
      await BookingHasOption.create({
        bookingId: id,
        optionId: element,
      });
    });
  },

  removeOptions: async (id, bookingId) => {
    await BookingHasOption.destroy({
      where: {
        bookingId,
        optionId: id,
      },
      limit: 1,
    });
  },
  
  Read: async (id) => {
    const booking = await Booking.findOne({
      include: [
        {
          association: 'option',
          attributes: ['id', 'name', 'price'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'room',
        },
        {
          association: 'user',
          attributes: ['id', 'email', 'firstname', 'lastname'],
        },
      ],
      where: {
        id,
      },
    });

    return booking;
  },

  Update: async (id, data) => {
    const [isUpdated] = await Booking.update(data, {
      where: {
        id,
      },
    });

    return !!isUpdated;
  },

  ReadAll: async () => {
    const bookings = await Booking.findAll();
    return bookings;
  },

  Disable: async (id) => {
    const [isUpdated] = await Booking.update({ cancel: 1 }, {
      where: {
        id,
      },
    });

    return !!isUpdated
  },
};
