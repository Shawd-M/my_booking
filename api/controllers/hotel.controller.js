const Hotel = require('../services/hotel.service');
const Room = require('../services/room.service');

module.exports = (app, GeneralError) => {
  app.get('/', (
    async (req, res, next) => {
      try {
        const hotels = await Hotel.ReadAll();

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: hotels,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.get('/:id', (
    async (req, res, next) => {
      try {
        const hotel = await Hotel.Read(req.params.id);

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: hotel,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.post('/', (
    async (req, res, next) => {
      try {
        const [hotel, created] = await Hotel.Create(req.body);

        if (!created) {
          throw new GeneralError('Hotel existe deja.', 404);
        }

        return res.status(200).json({
          message: 'La création a été effectuée avec succès.',
          values: hotel,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.put('/update/:id',
    async (req, res, next) => {
      try {
        const hotel = await Hotel.Update(req.params.id, req.body);

        if (!hotel) {
          throw new GeneralError('Aucun hotel trouvé avec cet id.', 404);
        }

        return res.status(200).json({
          message: 'La modification a été effectuée avec succès.',
          values: hotel,
        });
      } catch (error) {
        next(error);
      }
    });

  app.post('/:id/room',
    async (req, res, next) => {
      try {
        const data = {
          ...req.body,
          hotelId: req.params.id,
        }
        const [room, created] = await Room.Create(data);

        if (!created) {
          throw new GeneralError('Aucun hotel trouvé avec cet id.', 404);
        }
        
        return res.status(200).json({
          message: 'La création a été effectuée avec succès.',
          values: room,
        });
      } catch (error) {
        next(error);
      }
    });

  app.get('/:id/room',
    async (req, res, next) => {
      try {
        const rooms = await Room.ReadByHotel(req.params.id);

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: rooms,
        });
      } catch (error) {
        next(error);
      }
    });

  app.put('/:id/room/:roomId',
    async (req, res, next) => {
      try {
        const room = await Room.Update(req.params, req.body);

        return res.status(200).json({
          message: 'La modification a été effectuée avec succès.',
          values: room,
        });
      } catch (error) {
        next(error);
      }
    });
  return app;
};