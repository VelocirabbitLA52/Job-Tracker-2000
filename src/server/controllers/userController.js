const db = require('../models/jobSearchModels');

const userController = {};

userController.getJobs = (req, res, next) => {
  // grab get parameters (username id) to query all job listings: 
  //! assume that the passed in parameters in userId is req.params.id 
  const jobQuery = `
  SELECT *
  FROM jobListings2 
  WHERE jobListings2.user_id = (
  SELECT _id FROM users WHERE name = $1)`;
  const userId = [res.locals.name];
  console.log('this is userId', userId);
  db.query( jobQuery, userId )
    .then((result) => {
      // console.log('this our result.rows', result.rows);
      res.locals.jobs = result.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Express error handler caught in getJobs middleware error',
        status: 500,
        message: { err: 'An error in getJobs' },
      });
    });
};

userController.postJob = (req, res, next) => {
  // grab all parameters user can post- even if it isnt inputted
  // check if company name exists in input- else create new company in company table
  
  //do a query to retrieve the user ID number that matches the username saved to 
  const { jobTitle, companyName, jobListingUrl } = req.body;
  console.log('username is', res.locals.name);
  const userName = [res.locals.name];
  const userIdQueryStr = 'SELECT _id FROM users WHERE name = ($1)';
 
  db.query(userIdQueryStr, userName)
    .then(result => {
      const userIDNum = result.rows[0]._id;
      console.log('the userIDNum in post job is: ', userIDNum);

      const values = [jobTitle, jobListingUrl, companyName, userIDNum]; 
      console.log('post job values for nested query are: ', values);
  
      const jobQuery = 'INSERT INTO jobListings2(jobtitle, url, company_name, user_id) VALUES ($1, $2, $3, $4) RETURNING *';

      db.query(jobQuery, values)
        .then((result) => {
          console.log('QUERY RESULT IS ', result.rows);
          res.locals.newJob = result.rows;
          return next();
        });
    })
    .catch(err => {
      return next({
        log: 'Express error handler caught in getJobs middleware error',
        status: 500,
        message: { err: 'An error in getJobs' },
      });
    });
};

userController.getCompany = (req, res, next) => {
  const { companyName } = req.body;
  console.log('req body comp name', req.body.companyName);
  
  const userName = [res.locals.name]; 
  const userIdQueryStr = 'SELECT _id FROM users WHERE name = ($1)';
  
  db.query(userIdQueryStr, userName)
    .then(result => {
      const userIDNum = result.rows[0]._id;
      console.log('the userIDNum in get company is: ', userIDNum);

      const values = [companyName, userIDNum]; 
      console.log('get companies values for nested query are: ', values);

      const companyQuery = 'SELECT * from jobListings2 WHERE company_name = ($1) AND user_id = ($2)';

      db.query(companyQuery, values)
        .then((result) => {
          console.log('COMPANY QUERY RESULT IS ', result.rows);
          res.locals.companies = result.rows;
          return next();
        });
    })
    .catch(err => {
      return next({
        log: 'Express error handler caught in getJobs middleware error',
        status: 500,
        message: { err: 'An error in getJobs' },
      });
    });
};

module.exports = userController;