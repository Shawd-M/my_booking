const Room = require('../services/room.service');

module.exports = (app, GeneralError) => {
  app.get('/:id', (
    async (req, res, next) => {
      try {
        const room = await Room.Read(req.params.id);

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: room,
        });
      } catch (error) {
        next(error);
      }
    }
  ));
  return app;
};