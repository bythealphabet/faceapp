const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const { Client, Pool } = require('pg')
const PORT = process.env.PORT || 3000

const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
// const profile = require('./controllers/profile.js')
// const image = require('./controllers/image.js')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

db.connect()

const app = express()
app.use(bodyParser.json())

app.get('/', (req,res)=>{res.send('Im in YUUPPIII!!!')})
app.post('/signin',(req, res)=>{signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res)=>{register.handleRegister(req, res, pool, bcrypt)})
// app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
// app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
// app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

app.listen(PORT, ()=>{
	console.log(`app is running on port ${PORT}`)
})