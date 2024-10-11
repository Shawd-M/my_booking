const Booking = require('../services/booking.service');
const Room = require('../services/room.service');
const Option = require('../services/option.service');
const moment = require('moment');

module.exports = (app, GeneralError) => {
  app.post('/room/:id', (
    async (req, res, next) => {
      try {
        const { option, ...data} = req.body;
        if (moment(data.startDate).isAfter(data.endDate)) {
          throw new GeneralError('La date de début doit être antérieure à la date de fin.', 400);
        }

        const existingBooking = await Booking.existingBooking({...data, roomId: req.params.id})

        if (existingBooking) {
          throw new GeneralError('Une réservation existe déjà pour cette chambre et cette période.', 409);
        }

        const room = await Room.Read(req.params.id);

        if (!room) {
          throw new NotFoundError('Chambre introuvable.');
        }
    
        if (data.peopleNb > room.capacity) {
          throw new GeneralError('Le nombre de personnes dépasse la capacité de la chambre.', 400);
        }

        const [booking, created] = await Booking.Create({...data, roomId: req.params.id});

        if (!created) {
          throw new GeneralError('Booking existe deja.', 404);
        }

        if (option && option.length > 0) {
          await Booking.setOptions(option, booking.id);
          await Option.Decrement(option);
        }

        return res.status(200).json({
          message: 'La création a été effectuée avec succès.',
          values: booking,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.get('/', async (req, res, next) => {
    try {
      const bookings = await Booking.ReadAll();
      return res.status(200).json({
        message: 'La récupération a été effectuée avec succès.',
        values: bookings,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/:id', async (req, res, next) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.Read(bookingId);
  
      if (!booking) {
        throw new NotFoundError('Réservation introuvable.');
      }
  
      return res.status(200).json({
        message: 'La récupération a été effectuée avec succès.',
        values: booking,
      });
    } catch (error) {
      next(error);
    }
  });

  app.put('/disable/:id', async (req, res, next) => {
    try {
      const bookingId = req.params.id;
  
      const booking = await Booking.Read(bookingId);
  
      if (!booking) {
        throw new NotFoundError('Réservation introuvable.');
      }
      
      const isDisabled = await Booking.Disable(bookingId);

      if (isDisabled && booking.option && booking.option.length > 0) {
        const optionIds = booking.option.map(option => option.id);
        await Option.Increment(optionIds);
      }
  
      return res.status(200).json({
        message: 'La réservation a été désactivée avec succès.',
        values: isDisabled,
      });
    } catch (error) {
      next(error);
    }
  });

  app.put('/:id', async (req, res, next) => {
      try {
        const booking = await Booking.Update(req.params.id, req.body);

        return res.status(200).json({
          message: 'La modification a été effectuée avec succès.',
          values: booking,
        });
      } catch (error) {
        next(error);
      }
    });

  app.post('/addOption/:id', async (req, res, next) => {
    try {
      const bookingId = req.params.id;
      const { option } = req.body;

      const booking = await Booking.Read(bookingId);

      if (!booking) {
        throw new NotFoundError('Réservation introuvable.');
      }

      await Booking.setOptions(option, bookingId);
      await Option.Decrement(option);

      return res.status(200).json({
        message: 'L\'ajout a été effectuée avec succès.',
        values: true,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post('/removeOption/:id', async (req, res, next) => {
    try {
      const bookingId = req.params.id;
      const { option } = req.body;

      const booking = await Booking.Read(bookingId);

      if (!booking) {
        throw new NotFoundError('Réservation introuvable.');
      }

      await Booking.removeOptions(option, bookingId);
      await Option.Increment(option);

      return res.status(200).json({
        message: 'La suppression a été effectuée avec succès.',
        values: true,
      });
    } catch (error) {
      next(error);
    }
  });


  return app;
};