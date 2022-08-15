const express = require('express');

const userController = require('../controllers/userController');
const loginControllers = require('../controllers/loginControllers');

const router = express.Router();

// get request for specific user @ /api/jobs
router.get('/jobs', loginControllers.checkForToken, loginControllers.verifyToken, userController.getJobs, ( req, res ) => {
  return res.status(200).json(res.locals.jobs);
});

// post request for user to add to their list of applications
router.post('/jobs', userController.postJob, ( req, res ) => {
  return res.status(200).json({ job: res.locals.job });
});


module.exports = router;