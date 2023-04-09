const expres = require('express')
const cors = require('cors')
const fs = require('fs')

const app = expres()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(expres.static('public'))

const sundaeOptionsRaw = fs.readFileSync('./sundae-options.json', 'utf-8')
const sundeOptions = JSON.parse(sundaeOptionsRaw)

app.get('/scoops', (req, res) => {
    res.json(sundeOptions.iceCreamFlavors)
})

app.get('/toppings', (req, res) => {
    res.json(sundeOptions.toppings)
})

// app.post('/order', (req, res) => {
//     res.json(sundeOptions.iceCreamFlavors)
// })
