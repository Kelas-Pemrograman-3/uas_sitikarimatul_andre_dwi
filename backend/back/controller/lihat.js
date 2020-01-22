const lihatmod = require('../models/lihat')
const ObjectId = require('mongoose').Types.ObjectId

exports.insertjalan = (data) =>
new Promise((resolve, reject) => {
    lihatmod.create(data)
    .then((res) => {
        resolve ({error: false, pesan:'Data Tersimpan'})
    }).catch(res => {
        reject({error: true, pesan: ' Gagal Tersimpan'})
    })
})

exports.insertjalanmk=(kode,tujuan,tanggal,nama,jk,alamat,umur,nopon,email,debit,name,expired,cvv)=>
new Promise((resolve, reject) => {
    console.log(kode)
let dataMk = new jalanmod({
kode: kode,
tujuan: tujuan,
tanggal: tanggal,
nama: nama,
jk: jk,
alamat: alamat,
umur: umur,
nopon: nopon,
email:email,
debit: debit,
name: name,
expired: expired,
cvv: cvv
});

lihatmod.create(dataMk)
.then(res => {
resolve ({error: false,
pesan: 'Data Terinput'})
})
.catch(res => {
reject({
error: true,
pesan: 'Gaagal Terinput'
})
})
})


exports.getAllMk = () =>
new Promise((resolve, reject) => {
    lihatmod.find()
    .then(res => {
        resolve ({error: false, pesan: ' Data Berhasil di ambil', data: res})
    })
    .catch(res => {
        console.log(error)
        reject ({error:true, pesan: ' Data tidak Diambil'})
    })
})

exports.getByID = (id) =>
new Promise((resolve, reject) => {
    lihatmod.findOne({
        _id: ObjectId(id)
    })
    .then(res => {
        resolve ({error: false, pesan: ' Data Berhasil di ambil', data: res})
    })
    .catch(res => {
        console.log(error)
        reject ({error:true, pesan: ' Data tidak Diambil'})
    })
})

exports.editjalan = (id, data) => 
    new Promise ((resolve, reject) => {
        try {
            lihatmod.updateOne({
                _id:  ObjectId(id)
            }, data).then(() => {
              // console.log('berhasil edit')
              resolve ({
                  error: false,
                  pesan: 'berhasil mengubah data',
              })
            }).catch(() => {
                reject({
                    error: true,
                    pesan: ' gagal mengubah data',
                })
              // console.log('terjadi error')
            })
        } catch (error) {
            console.log(error)
        }
    })

    exports.updateMkAndroid = (kode,tujuan,tanggal,nama,jk,alamat,umur,nopon,email,debit,name,expired,cvv)=>
new Promise(async (resolve, reject) => {

// let query = {_id: ObjectId(req.params.id)};
// console.log(dataMk)
console.log("disini nih")

await lihatmod.update(
{ _id: ObjectId(id) },
{
$set: {
kode: kode,
tujuan: tujuan,
tanggal: tanggal,
nama: nama,
jk: jk,
alamat: alamat,
umur: umur,
nopon: nopon,
email:email,
debit: debit,
name: name,
expired: expired,
cvv: cvv

}
})
.then(res => {
resolve ({error: false,
pesan: 'Data Berhasil Dirubah'})
})
.catch(res => {
console.log("disini")
reject({
error: true,
pesan: 'Gaagal Dirubah'
})
})
})
    exports.deletejalan= (id) =>
    new Promise ((resolve,reject)=>{
        lihatmod.deleteOne({
            _id: ObjectId(id)
        }).then(()=>{
            resolve({
                error:false,pesan:'berhasil apus data'
            }).catch(()=>{
                reject({
                error:true,pesan:'gagal apus data'
            })
        })
    })
    })