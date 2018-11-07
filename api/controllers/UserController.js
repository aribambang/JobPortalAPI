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

      const {email , password} = await Joi.validate(req.allParams(), schema);
      const encryptedPassword = await UtilService.hashPassword(password);

      const results = await User.create({
        email,
        password: encryptedPassword
      });

      return res.ok(results);
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
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email , password} = await Joi.validate(req.allParams(), schema);
      const user = await User.findOne({email});
      if(!user){
        return res.notFound({error: 'user tidak ada'});
      }
      const matchedPassword = await UtilService.comparePassword(password, user.password);
      if(!matchedPassword){
        return res.badRequest({error: 'gagal'});
      }
      const token = JWTService.issuer({user: user.id}, '1 day');
      return res.ok({token});
    } catch (error) {
      if(error.name === 'ValidationError'){
        return res.badRequest({error});
      }
      return res.serverError(error);
    }
  }

};

