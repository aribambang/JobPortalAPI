/**
 * LowonganController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `LowonganController.create()`
   */
  create: async function (req, res) {
    try {
      let {judul, deskripsi, gaji, posisi, perusahaanId} = req.allParams();
      if(!judul){
        return res.badRequest({err: 'judul kosong'});
      }
      if(!gaji){
        return res.badRequest({err: 'gaji kosong'});
      }

      const lowonganDetail = await LowonganDetail.create({
        deskripsi, gaji, posisi
      }).fetch();
      const lowongan = await Lowongan.create({judul, lowonganDetail: lowonganDetail.id, perusahaan: perusahaanId}).fetch();

      return res.ok(lowongan);
    } catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `LowonganController.find()`
   */
  find: async function (req, res) {
    try {
      const lowongans = await Lowongan.find({})
        .populate('lowonganDetail')
        .populate('perusahaan');
      return res.ok(lowongans);
    } catch (error) {
      return res.serverError(error);
    }
  }

};

