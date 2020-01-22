const lihat = require('express')()
const jalancon = require('../controller/lihat')


lihat.post('/insert', (req, res) => {
    console.log(req.body);
    jalancon.insertjalan(req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

lihat.post('/insertmk',(req, res)=> {
    jalancon.insertjalanmk(req.body.kode,req.body.tujuan,req.body.tanggal,req.body.nama,req.body.jk,
        req.body.alamat,req.body.umur,req.body.nopon,req.body.email,req.body.debit,req.body.name,req.body.expired,req.body.cvv)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(error)
    })
})


lihat.get('/getall', (req, res) => {
    jalancon.getAllMk(req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

lihat.get('/get/:id', (req, res) => {
    jalancon.getByID(req.params.id, req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

lihat.put('/edit/:id', (req, res) => {
    console.log(req.params.id)
    jalancon.editjalan(req.params.id, req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

lihat.put('/updatemk/:id', (req, res) => {
    jalancon.updateMkAndroid(req.body.kode,req.body.tujuan,req.body.tanggal,req.body.nama,req.body.jk,
        req.body.alamat,req.body.umur,req.body.nopon,req.body.email,req.body.debit,req.body.name,req.body.expired,req.body.cvv)
        .then(result => res.json(result))
        .catch(error => res.json(error))
})


lihat.delete('/delete/:id', (req, res) => {
    jalancon.deletejalan(req.params.id)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = lihat