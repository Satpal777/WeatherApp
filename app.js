require('dotenv').config()
var request = require("request");
const port = 3000
const { json } = process.env.PORT || require('body-parser');

const cors = require('cors');
const express = require('express')
const app = express()
const path = require('path');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.post('/', async (req, res) => {
    try {
        console.log(req.body.city)
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&lang=hi&appid=${process.env.API}`
        var out
        request.get(url, { json: true }, (err,r, body) => {
            console.log(url,err,body)
            if (err) {
                console.log(err)
                res.send(err)
            }
            else {
                console.log(body)
                res.send(body)
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ res: "Something went wrong!" })
    }
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})