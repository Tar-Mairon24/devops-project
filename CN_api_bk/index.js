const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()


const port = 3000
const db = require ('./queries')

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
	response.setHeader('Content-Type','application/json',
                    'Access-Control-Allow-Origin','*',
                    'Access-Control-Allow-Methods','POST,PATCH,OPTIONS',"Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
    response.json({ info: 'Node.js, Express, and Postgre API'})
})

// ends points

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`APP running on port ${port}.`)
})



