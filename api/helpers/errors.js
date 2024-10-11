/**
 * Classe GéneralError qui permet de cree nos propre erreur HTTP
 */
class GeneralError extends Error {
  constructor(message, code = 400) {
    super();
    this.message = message;
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}

module.exports = {
  GeneralError,
};
