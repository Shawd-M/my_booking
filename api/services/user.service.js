const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Role, UserHasRole } = require('../models');

module.exports = {
  /**
   * Verifie si le mot de passe fournit correspond avec le hash de la bdd
   * @param password1
   * @param password2
   * @returns {Promise<*>}
   * @constructor
   */
   Compare: async (password1, password2) => {
    const isMatch = await bcrypt.compare(password1, password2);
    return isMatch;
  },
  /**
   * Verifie si un utilisateur existe sinon il le cree
   * @param data
   * @returns {Promise<(Model<any, TModelAttributes>|boolean)[]>}
   * @constructor
   */
  FindOrCreate: async (data) => {
    const [user, created] = await User.findOrCreate({
      where: {
        email: data.email,
      },
      raw: true,
      defaults: data,
    });
    return [user, created];
  },

   /**
   * Verifie si un user existe à partir de son id ou de son email et le retourne
   * @param data
   * @returns {Promise<Model<any, TModelAttributes>>}
   * @constructor
   */
  FindUser: async (data) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: data },
          { id: data },
        ],
      },
    });
    return user;
  },

  AddRole: async (roleId, userId) => {
    const [role, created] = await UserHasRole.findOrCreate({
      where: {
        userId,
        roleId,
      },
      defaults: { roleId, userId },
    });
    return created;
  },

  Read: async (id) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    return user;
  },

  Update: async (id, data) => {
    const [isUpdated] = await User.update(data, {
      where: {
        id,
      },
    });

    return !!isUpdated;
  },

  ReadAll: async () => {
    const users = await User.findAll();
    return users;
  },
};
