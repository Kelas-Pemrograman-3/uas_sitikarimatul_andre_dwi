const jalanmod = require('../models/jalan')
const ObjectId = require('mongoose').Types.ObjectId

exports.insertjalan = (data) =>
new Promise((resolve, reject) => {
    jalanmod.create(data)
    .then((res) => {
        resolve ({error: false, pesan:'Data Tersimpan'})
    }).catch(res => {
        reject({error: true, pesan: ' Gagal Tersimpan'})
    })
})

exports.insertjalanmk=(nama,no,sekalijalan,pulangpergi,dari,ke,kalender1,kalender2,kelas)=>
new Promise((resolve, reject) => {
    console.log(nama)
let dataMk = new jalanmod({
nama: nama,
no: no,
sekalijalan: sekalijalan,
pulangpergi: pulangpergi,
dari:dari,
ke: ke,
kalender1: kalender1,
kalender2: kalender2,
kelas: kelas
});

jalanmod.create(dataMk)
.then(res => {
resolve ({error: false,
pesan: 'Data Terimput'})
})
.catch(res => {
reject({
error: true,
pesan: 'Gaagal Terimput'
})
})
})


exports.getAllMk = () =>
new Promise((resolve, reject) => {
    jalanmod.find()
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
    jalanmod.findOne({
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
            jalanmod.updateOne({
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

    exports.updateMkAndroid = (id,nama,no,sekalijalan,pulangpergi,dari,ke,kalender1,kalender2,kelas) =>
new Promise(async (resolve, reject) => {

// let query = {_id: ObjectId(req.params.id)};
// console.log(dataMk)
console.log("disini nih")

await jalanmod.update(
{ _id: ObjectId(id) },
{
$set: {
    nama: nama,
    no: no,
    sekalijalan: sekalijalan,
    pulangpergi: pulangpergi,
    dari:dari,
    ke: ke,
    kalender1: kalender1,
    kalender2: kalender2,
    kelas: kelas
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
        jalanmod.deleteOne({
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