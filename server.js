const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
const ShortUrl = require('./models/shortUrl')
const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})

// app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.get('/api/urls', async (req, res) => {
    const shorturl = await ShortUrl.find();
    res.send({status: "success", data: shorturl})
})

app.post('/api/shortUrls', async (req, res) => {
    console.log("post", req.body)
    try { 
        const shorturl = await ShortUrl.create({full: req.body.full})
        res.send({ status: 'success', data: shorturl})
    } catch(err) {
        res.send(err)
    }
})

app.get('/api/:shorturl', async (req, res) => {
    const { shorturl } = req.params
    const shortUrl = await ShortUrl.findOne({ short: shorturl})
    if (shortUrl === null) {
        return res.sendStatus(404)
    } 
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

app.delete('/api/:urlId', async (req, res) => {
    const {urlId} = req.params;
    try {
        const deletedLink = await ShortUrl.findByIdAndRemove(urlId)
        res.send({ status: "success", data: deletedLink })
    } catch (err) {
        res.send(err)
    }
})

app.listen(PORT, () => {
    console.log("hehe im listening @ port", PORT)
})