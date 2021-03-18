const express = require('express');

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true,
  }
});

db.select('*').from('users')


app.get('/', (req,res) => {
  res.send('it is working')
})

app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt )})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db )})

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApi(req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`)
})

