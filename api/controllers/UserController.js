/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require('joi');

module.exports = {
  
  
  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
     
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });

      const params = await Joi.validate(req.allParams(), schema);

      return res.ok(params);
    } catch (error) {
      if(error.name === 'ValidationError'){
        return res.badRequest({error});
      }
      return res.serverError(error);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    return res.json({
      todo: 'login() is not implemented yet!'
    });
  }

};

