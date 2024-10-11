const User = require('../services/user.service');

module.exports = (app, GeneralError) => {
  app.get('/:id',
    async (req, res, next) => {
      try {
        const user = await User.Read(req.params.id);

        if (!user) {
          throw new GeneralError('Aucun utilisateur trouvé avec cet id.', 404);
        }

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: user,
        });
      } catch (error) {
        next(error);
      }
    });

  app.put('/update/:id',
    async (req, res, next) => {
      try {
        const user = await User.Update(req.params.id, req.body);

        if (!user) {
          throw new GeneralError('Aucun utilisateur trouvé avec cet id.', 404);
        }

        return res.status(200).json({
          message: 'La modification a été effectuée avec succès.',
          values: user,
        });
      } catch (error) {
        next(error);
      }
    });

  app.get('/read/all',
    async (req, res, next) => {
      try {
        const users = await User.ReadAll();

        return res.status(200).json({
          message: 'La récupération a été effectuée avec succès.',
          values: users,
        });
      } catch (error) {
        next(error);
      }
    });

  return app;
};