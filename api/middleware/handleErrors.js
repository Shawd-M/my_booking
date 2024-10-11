const { GeneralError } = require('../../../GPE/cooksign-api/helpers/errors');
/**
 * Gestion global des erreurs HTTP
 * @param err
 * @param req
 * @param res
 * @param next => non utilisé mais obligatoire !
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      code: err.code,
      message: err.message,
    });
  }

  if (err.details) {
    const { message } = err.details[0];
    return res.status(400).json({
      status: 'error',
      message,
    });
  }
  // eslint-disable-next-line no-console
  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: err,
  });
};

module.exports = handleErrors;
