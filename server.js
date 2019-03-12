const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

const db_url = 'postgres://ccmbzxmwebvnvi:d2bfc18a9fa4681912f49ee928e6f8d8f9c7304b4a7be5e355810aff5cb36a77@ec2-75-101-133-29.compute-1.amazonaws.com:5432/dbmcofg07rqgur'


const db = knex({
  client: 'pg',
  connection: db_url,
  ssl: true
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get ('/', (req,res)=>{
	res.send('it is working!')
})

app.post('/signin',(req, res)=>{signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

app.listen (process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT}`)
})


