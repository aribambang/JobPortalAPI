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
        alamat: params.alamat
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
  update(req, res){

  },
  delete(req, res){

  }
};