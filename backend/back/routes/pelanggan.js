const pelanggan = require('express')()
const pelangganController = require('../controller/pelanggan')

pelanggan.post('/insert', (req, res) => {
  pelangganController.insertpelanggan(req.body)
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})
pelanggan.post('/login', (req, res) => {
 pelangganController.login(req.body)
  .then(result => {
    res.json(result)
  }).catch(err => {
    res.json(err)
  })
})

pelanggan.get('/getAllMhs', (req, res) => {
  pelangganController.getAllpelanggan()
    .then(result => {
      res.json(result)
    }).catch(err => {
      res.json(err)
    })
})
module.exports = pelanggan