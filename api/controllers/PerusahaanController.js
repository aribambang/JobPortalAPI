module.exports = {

  async create(req, res){
    try {

    //mendapatkan nama dari request parameter
      let params = req.allParams();
      if(!params.nama){
        return res.badRequest({err: 'nama is required field'});
      }
      //membuat record baru di perusahaan
      const results = await Perusahaan.create({
        nama: params.nama,
        kota: params.kota,
        alamat: params.alamat,
        user: req.user
      });
      return res.ok(results);
    }
    catch (err){
      return res.serverError(err);
    }
  },
  async find(req, res){

    try {
      const perusahaans = await Perusahaan.find();
      return res.ok(perusahaans);
    } catch (err) {
      return res.serverError(err);
    }

  },
  async findOne(req, res){
    try {
      const perusahaan = await Perusahaan.findOne({
        id: req.params.id
      });
      return res.ok(perusahaan);
    } catch (err) {
      return res.serverError(err);
    }
  },
  async update(req, res){
    try {
      let params = req.allParams();
      let attributes = {};
      if(params.nama){
        attributes.nama = params.nama;
      }
      if(params.kota){
        attributes.kota = params.kota;
      }
      if(params.alamat){
        attributes.alamat = params.alamat;
      }

      const results = await Perusahaan.update({id: req.params.id}, attributes);
      return res.ok(results);
    } catch (err) {
      return res.serverError(err);
    }

  },
  async delete(req, res){
    try {
      const results = await Perusahaan.destroy({
        id: req.params.id
      });
      return res.ok(results);
    } catch (err) {
      return res.serverError(err);
    }
  }
};