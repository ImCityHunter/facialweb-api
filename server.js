const express = require('express'); //get express package
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//access of handlers
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image')

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-deep-92266',
    user : '',
    password : '',
    database : 'smart-brain'
  }
});
const app = express(); //run express
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{res.send('it is working??!!')})
app.post('/SignIn',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res)  => {register.handleRegister (req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=> {image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall (req,res)})

app.listen(process.env.PORT|| 3000,()=>{
	console.log('app is running on port ${process.env.PORT}');
})