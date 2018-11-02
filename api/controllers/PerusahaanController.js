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
  find(req, res){

  },
  findOne(req, res){

  },
  update(req, res){

  },
  delete(req, res){

  }
};