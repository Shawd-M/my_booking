const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const { FindUser } = require('../services/user.service');

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SIGN_SECRET,
};
/**
 * Création de la stratégie JWT qui à partir d'un token retournera les informations de l'utilisateur
 * correspondant.
 * @type {JwtStrategy}
 */
const jwtStrategy = new JWTStrategy(jwtOptions, (async (jwtPayload, done) => {
  try {
    const user = await FindUser(jwtPayload.sub);
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

passport.use('jwt', jwtStrategy);
