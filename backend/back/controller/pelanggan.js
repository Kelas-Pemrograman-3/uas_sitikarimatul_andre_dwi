const pelangganModel = require('../models/pelanggan')
const bcrypt =require('bcryptjs')

exports.insertpelanggan = (data) =>
 new Promise((resolve, reject) => {

  bcrypt.hash(data.password, 10, (err, hash) => {
    data.password = hash
    pelangganModel.find({
      email:data.email
  }).then(hasil =>  {
    if (hasil.length > 0) {
      reject({
        eror: true,
        pesan: 'email Sudah Digunakan'
      })
    } else {
     pelangganModel.create(data)
         .then(res => {
           resolve({
             eror:false,
             pesan: 'Berhasil Input Data',
             data: res
           })
       }).catch(() => {
         reject({
           eror: true,
           pesan: 'Gagal Input Data'
         })
       })
      }
    })     
  })
 })

exports.login = (data) =>
new Promise((resolve, reject) => {
  pelangganModel.findOne({
    email: data.email
  }).then(res => {
    console.log(res)
    if (res === null) {
      reject({
        eror: true,
        pesan: 'Username Tidak Terdaftar'
      })
    } else {
      let hashpassword = res.password
     if ( bcrypt.compareSync(data.password, hashpassword)) {
       resolve({
         eror: false,
         pesan: 'Berhasil Login',
         data: res
       })
     } else {
       reject({
         eror: true,
         pesan: 'Password Anda Salah'
       })
     }
    }
  })
})

exports.getAllpelanggan = () =>
new Promise((resolve, reject) => {
  pelangganModel.find()
    .then(res => {
      resolve({
        eror:false,
        pesan: 'Berhasil Mengambil Data',
        data:res
      })
  }).catch(() => {
    reject({
      eror: true,
      pesan: 'Gagal Mengambil Data'
    })
  })
})
