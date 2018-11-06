/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const {nama, email, lowonganId } = req.allParams();
      if(!nama){
        return res.badRequest({error: 'nama kandidat kosong'});
      }
      if(!email){
        return res.badRequest({error: 'email kandidat kosong'});
      } 
      if(!lowonganId){
        return res.badRequest({error: 'lowongan kosong'});
      }  
      const kandidat = await Kandidat.create({
        nama, email
      })
        .fetch();
      const app = await Application.create({
        kandidat: kandidat.id,
        lowongan: lowonganId
      }).fetch();
      return res.ok(app);
    } catch (error) {
      return res.serverError(error);
    }
  },

  async find(req, res){
    try {
      const apps = await Application.find()
        .populate('lowongan')
        .populate('kandidat');
      return res.ok(apps);
    } catch (error) {
      return res.serverError(error);
    }
  }
};

