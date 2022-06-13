const path = require('path')
const express = require('express')

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.np
const bodyParser = require('body-parser')

// node.js package for providing a Connect/Express middleware
const cors = require('cors')
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Identify the project folder
app.use(express.static('dist'))

const port = process.env.PORT || 3000

app.listen(port, listening)

function listening() {
    console.log(`CORS-enabled web server listening on port ${port}`)
    //console.log(`Server is running on port ${port}`)
}

app.get('/', getData)

function getData(request, response) {
    response.sendFile('dist/index.html')
}