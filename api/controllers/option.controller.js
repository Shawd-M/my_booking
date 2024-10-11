const Option = require('../services/option.service');

module.exports = (app, GeneralError) => {
  app.post('/hotel/:id', (
    async (req, res, next) => {
      try {
        const [option, created] = await Option.Create({...req.body, hotelId: req.params.id});

        if (!created) {
          throw new GeneralError('Option existe deja.', 404);
        }

        return res.status(200).json({
          message: 'La création a été effectuée avec succès.',
          values: option,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.get('/:id', (
    async (req, res, next) => {
      try {
        const option = await Option.Read(req.params.id);

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: option,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.put('/update/:id',
    async (req, res, next) => {
      try {
        const option = await Option.Update(req.params.id, req.body);

        if (!option) {
          throw new GeneralError('Aucun option trouvé avec cet id.', 404);
        }

        return res.status(200).json({
          message: 'La modification a été effectuée avec succès.',
          values: option,
        });
      } catch (error) {
        next(error);
      }
    });

  return app;
};