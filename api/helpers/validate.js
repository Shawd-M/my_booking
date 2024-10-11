const { Model } = require('sequelize');
const Joi = require('joi');

const errorMessages = (field, type = 'string', pattern = '') => {
  const messages = {};
  messages[`${type}.base`] = `Le champ ${field} doit etre de type ${type}`;
  messages[`${type}.empty`] = `Le champ ${field} ne peut etre vide`;
  messages[`${type}.min`] = `Le champ ${field} doit etre au minimum {#limit}`;
  messages[`${type}.max`] = `Le champ ${field} doit etre au maximum de {#limit}`;
  messages[`${type}.pattern.base`] = `Le champ ${field} doit contenir ${pattern}`;
  messages['any.required'] = `Le champ ${field} est obligatoire`;

  return messages;
};

/**
 * Hooks sequelize général qui permet de verifier juste avant la création si les données fourni sont
 * conforme au schema Joi definit.
 * @param schema
 * @param model
 * @returns {Promise<void>}
 * @constructor
 */
const ValidateBeforeCreate = async (schema, model) => {
  const data = model.dataValues;
  delete data.id;
  await schema.validateAsync(data);
};
/**
 * Hooks sequelize général qui permet de verifier juste avant la création par bulk si les données
 * fourni sont conforme au schema Joi definit.
 * @param schema
 * @param model
 * @returns {Promise<void>}
 * @constructor
 */
const ValidateBeforeBulkCreate = async (schema, model) => {
  const data = model.map((item) => {
    const tmp = item.dataValues;
    delete tmp.id;
    return tmp;
  });
  await schema.validateAsync(data);
};

module.exports = {
  Model,
  Joi,
  errorMessages,
  ValidateBeforeCreate,
  ValidateBeforeBulkCreate,
};
