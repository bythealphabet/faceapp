const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const { Client, Pool } = require('pg')
const register = require('./controllers/register.js')
const PORT = process.env.PORT || 3000
// const signin = require('./controllers/signin.js')
// const profile = require('./controllers/profile.js')
// const image = require('./controllers/image.js')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// const pool = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'smartbrain',
//   password: 'xb1RL2-',
// })

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


// const db = new Client({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'smartbrain',
//   password: 'xb1RL2-',
// })

db.connect()

const app = express()
app.use(bodyParser.json())



app.get('/', (req,res)=>{res.send('Im in YUUPPIII!!!')})
// app.post('/signin',(req, res)=>{signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res)=>{register.handleRegister(req, res, pool, bcrypt)})
// app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
// app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
// app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

// const text = 'INSERT INTO users(name, email, joined) VALUES($1, $2, $3) RETURNING *'
// const values = ['sal', 'sal@gmail.com',new Date()]

// client.query(text, values)
//   .then(res => {
//     console.log(res.rows[0])
//   })
//   .catch(e => console.error(e.stack))

///////////////////////////////////////////////////////////////////


  	// app.post('/register', )

app.listen(PORT, ()=>{
	console.log(`app is running on port ${PORT}`)
})