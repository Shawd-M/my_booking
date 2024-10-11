const { Op } = require('sequelize');
const { Option } = require('../models');

module.exports = {

  Create: async (data) => {
    const [option, created] = await Option.findOrCreate({
      where: data,
      defaults: data,
    });
    return [option, created];
  },

  Read: async (id) => {
    const option = await Option.findOne({
      where: {
        id,
      },
    });

    return option;
  },

  Update: async (id, data) => {
    const [isUpdated] = await Option.update(data, {
      where: {
        id,
      },
    });

    return !!isUpdated;
  },

  Decrement: async (optionId) => {
    await Option.decrement('availability', {
      by: 1,
      where: {
        id: optionId,
        availability: { [Op.gt]: 0 },
      },
    });

    return true;
  },

  Increment: async (optionId) => {
    await Option.increment('availability', {
      by: 1,
      where: {
        id: optionId,
      },
    });

    return true;
  }
};
