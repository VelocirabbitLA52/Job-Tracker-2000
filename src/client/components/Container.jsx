import React, { useEffect, useState } from "react";
import TabsContainer from "./TabsContainer";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import NewJobForm from "./NewJobForm";
import { Navigate, useNavigate } from "react-router-dom";


const test = {testList: [{
  jobTitle: "Sr. Software Engineer",
  companyName: "Google",
  jobListingUrl: "http://www.google.com",
  dateLastChecked: "08-08-08",
  starred: false,
  status: "applied",
  starOnClick: "func",
  notesText: "okay job",
  notesSave: "func"
},
{
  jobTitle: "Jr. Software Engineer",
  companyName: "GoogleJr",
  jobListingUrl: "http://www.google.com",
  dateLastChecked: "08-08-09",
  starred: false,
  status: "interviewing",
  starOnClick: "func",
  notesText: "",
  notesSave: "func"
}]}

const Container = (props) => {

  const [data, setData] = useState([]);
  const [isLoggedIn, setLoginState] = useState(null);
  
  async function getJobData() {
    
    const response = await fetch("/api/jobs", 
    { 
      method: "GET", 
      headers: {"Content-Type": "application/json"},
    });

    if (await response.status === 200) {
      setLoginState(true);
    } else if (await response.status === 401) {
      setLoginState(false);
    }

    const jobList = await response.json();

    console.log("jobList",jobList); //showing up in browser console
    // return data;

    const newJobList = jobList.map(element => {
      const newElement = {jobTitle: element.jobtitle,
      companyName: element.company_id,
      jobListingUrl: element.url,
      dateCreated: element.datecreated,
      starred: element.starred,
      status: element.status,
      notesText: element.note,};
      return newElement;    
    });
    
    console.log('newJobList', newJobList); //showing up in browser console
    console.log('setdata func', setData); //showing up in browser console

    await setData(newJobList)
      .then( () => console.log('UPDATED DATA WITH THEN ', data))

    console.log('this is updated data', data); //why is this still empty when this is printed to the console? Shouldn't it be changed since we setData passing in newJobList?
  }

  useEffect( () => {
    getJobData();
  }, [])

  return (
    <div className="container">
      {(isLoggedIn === false) && <Navigate to="/login" replace={true} />}
      <TabsContainer>
        <div label = "Jobs">
          <NewJobForm />
          <JobList testList = {data}/>
        </div>
        <div label = "Companies">
          <CompanyList />
        </div>
      </TabsContainer>    
    </div>);
}

export default Container;