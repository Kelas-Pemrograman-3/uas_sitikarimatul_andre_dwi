const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jalanSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  no: {
    type: String
  },
  sekalijalan: {
    type: String
  },
  pulangpergi: {
    type: String
  },
  dari: {
    type: String
  },
ke: {
  type: String
},
kalender1: {
  type: String
},
kalender2: {
  type: String
},
kelas: {
  type: String
}
})

module.exports = mongoose.model('jalan', jalanSchema)