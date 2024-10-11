module.exports = (app, GeneralError) => {
  /**
   * Gestion du cas où l'url saisie n'existe pas.
   */
  app.all('*', (req, res, next) => {
    try {
      throw new GeneralError('La route n\'existe pas', 404);
    } catch (error) {
      next(error);
    }
  });
  return app;
};
