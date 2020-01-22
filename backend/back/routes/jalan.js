const jalan = require('express')()
const jalancon = require('../controller/jalan')


jalan.post('/insert', (req, res) => {
    console.log(req.body);
    jalancon.insertjalan(req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

jalan.post('/insertmk',(req, res)=> {
    jalancon.insertjalanmk(req.body.nama,req.body.no,req.body.sekalijalan,req.body.pulangpergi,req.body.dari,req.body.ke,req.body.kalender1,req.body.kalender2,req.body.kelas)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(error)
    })
})


jalan.get('/getall', (req, res) => {
    jalancon.getAllMk(req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

jalan.get('/get/:id', (req, res) => {
    jalancon.getByID(req.params.id, req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

jalan.put('/edit/:id', (req, res) => {
    console.log(req.params.id)
    jalancon.editjalan(req.params.id, req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})

jalan.put('/updatemk/:id', (req, res) => {
    jalancon.updateMkAndroid(req.body.nama,req.body.no,req.body.sekalijalan,req.body.pulangpergi,req.body.dari,req.body.ke,req.body.kalender1,
        req.body.kalender2,req.body.kelas)
        .then(result => res.json(result))
        .catch(error => res.json(error))
})


jalan.delete('/delete/:id', (req, res) => {
    jalancon.deletejalan(req.params.id)
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
})


module.exports = jalan