const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lihatSchema = new Schema({
  kode: {
    type: String,
    required: true
  },
  tujuan: {
    type: String
  },
  tanggal: {
    type: String
  },
  nama: {
    type: String
  },
  jk: {
    type: String
  },
  alamat: {
    type: String
  },
  umur: {
    type: String
  },
  nopon: {
    type: String
  },
  email: {
    type: String
  },
  debit: {
    type: String
  },
  name: {
    type: String
  },
  expired: {
    type: String
  },
  cvv: {
    type: String
  }
})

module.exports = mongoose.model('lihat', lihatSchema)