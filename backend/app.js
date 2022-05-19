const express = require('express')
const MusicService = require('./MusicService')
const cors = require('cors');

const app = express()
const port = 8000

app.use(cors());

app.use('/media', express.static(__dirname + '/media'));

app.get('/api/random', (req, res) => {
    res.send(MusicService.getAllSongs())
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})