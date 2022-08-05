const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex (
    {
        client: 'pg', 
        connection: {
            connectionString: 'postgres://qfnkdanivmdbkm:0c4aea68dd9023d6213fe4b090e1d7f34007f74d3c6b5c80d3a68a72dc302196@ec2-3-225-110-188.compute-1.amazonaws.com:5432/d7hbk83c5mi8q1',
            ssl: true,
        }
    }
)
const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000,  ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})


