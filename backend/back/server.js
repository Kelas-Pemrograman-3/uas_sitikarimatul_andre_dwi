const server = require ('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 5000
const cors = require('cors')

const mongoURI = 'mongodb://localhost:27017/dbkapalkaram'

server.use(cors())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Connect to db success')
}).catch(err => {
    console.log('Eror : ' + err)
})

server.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

//list router
//server.use('/mahasiswa', require('./routers/mahasiswa'))
server.use('/jalan', require('./routes/jalan'))
server.use('/lihat', require('./routes/lihat'))
server.use('/pelanggan', require('./routes/pelanggan'))

server.listen(port, function () {
console.log('server started on port' + port)
})