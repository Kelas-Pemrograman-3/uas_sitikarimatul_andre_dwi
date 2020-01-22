const mongoose = require('mongoose')
const Schema = mongoose.Schema


const pelangganSchema = new Schema({
    email: {
        type: String,
        indexes: {
            unique: true
        }
    },
    nama: {
        type: String
    },
    alamat: {
        type: String
    },
    tanggal: {
        type: String
    }, 
    password: {
      type: String
    }
})

module.exports = mongoose.model('pelanggan', pelangganSchema)