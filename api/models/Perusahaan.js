module.exports = {

  attributes:{
    nama: {
      type: 'string',
      required: true
    },
    kota: {
      type: 'string'
    },
    alamat: {
      type: 'string'
    },

    //Association
    lowongan: {
      collection: 'Lowongan',
      via: 'perusahaan'
    },
    user: {
      model: 'user',
      columnName: 'userId',
      required: true
    }
  }

};