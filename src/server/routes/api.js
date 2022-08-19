const express = require('express');

const userController = require('../controllers/userController');
const loginControllers = require('../controllers/loginControllers');

const router = express.Router();

// get request for specific user @ /api/jobs
router.get('/jobs', loginControllers.checkForToken, loginControllers.verifyToken, userController.getJobs, ( req, res ) => {
  return res.status(200).json(res.locals.jobs);
});

// post request for user to add to their list of applications
router.post('/jobs', loginControllers.checkForToken, loginControllers.verifyToken, userController.postJob, userController.getJobs, ( req, res ) => {
  console.log('WE HAVE ENTERED POST JOB ROUTE HANDLER');
  return res.status(200).json(res.locals.jobs);
  // res.redirect('/api/jobs');
});


//post request to to get jobs from 1 Company
router.post('/company', loginControllers.checkForToken, loginControllers.verifyToken, userController.getCompany, ( req, res ) => {
  console.log('WE HAVE ENTERED POST COMPANY ROUTE HANDLER');
  return res.status(200).json(res.locals.companies);
  // res.redirect('/api/company');
});


module.exports = router;