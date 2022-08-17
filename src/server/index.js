const express = require('express');
const path = require('path');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const port = 3000;
const app = express();
const loginControllers = require('./controllers/loginControllers');
//jwt
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist')));

const apiRouter = require('./routes/api');

//loading of initial html single page source
app.get('/', (req, res) => {
  return res.status(200).send('hello!');
});

//handles all router paths
app.use('/api', apiRouter);

app.post('/signup', loginControllers.createUser, (req, res) => {
  console.log('WE HAVE ENTERED SIGN UP ROUTE HANDLER');
  return res.status(200).send('registered!');  //redirect to login
});

// this is the endpoint for logging in
app.post('/login', loginControllers.verifyUser, loginControllers.createToken, (req, res) => {
  return res.status(200).send('logged in!');
});

// this is a template for authentication on any of our homepage routes 
app.get('/afterLogin', loginControllers.checkForToken, loginControllers.verifyToken, (req, res) => {
  res.status(200).send('you can enter');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express Error handler caught in unknown middleware err',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
