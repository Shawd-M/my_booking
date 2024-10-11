const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../services/user.service');

module.exports = (app, GeneralError) => {
  app.post('/register', (
    async (req, res, next) => {
      try {
        const [user, created] = await User.FindOrCreate(req.body);

        if (!created) {
          throw new GeneralError('Cette email est déjà utilisé. veuillez en choisir un autre.', 409);
        }
        const isCreated = await User.AddRole(1, user.dataValues.id);

        if (!isCreated) {
          throw new GeneralError('Cet utilisateur possède déjà ce role.', 409);
        }
        
        return res.status(201).json({
          message: 'Création effectuée avec succés',
          values: user,
        });
      } catch (error) {
        next(error);
      }
    }
  ));

  app.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.FindUser(email);
      if (!user) {
        throw new GeneralError('email incorrect', 401);
      }
      const match = await User.Compare(password, user.password);

      if (!match) {
        throw new GeneralError('mot de passe incorrect', 401);
      }
      const token = jwt.sign(
        {
          sub: user.id,
          exp: Math.floor(Date.now() / 1000) + (3600 * 3),
        },
        process.env.JWT_SIGN_SECRET,
      );
      return res.status(200).json({
        message: 'Connexion réussie',
        token,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/me', passport.authenticate('jwt', { session: false }, null), async (req, res, next) => {
    try {
      const user = await User.FindUser(req.user.id);

      if (!user) {
        throw new GeneralError('Aucun utilisateur trouvé avec ce token.', 404);
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  return app;
};