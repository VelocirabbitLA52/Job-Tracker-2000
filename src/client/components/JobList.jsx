import React from 'react';
import JobDisplay from './JobDisplay'




const JobList = (props) => {
    const jobs = props.testList;
    console.log('JobListooo:',props.testList)
    const array = jobs.map(element => <JobDisplay jobTitle = {element.jobTitle} companyName= {element.companyName}
        jobListingUrl = {element.jobListingUrl} dateCreated = {element.dateCreated} starred= {element.starred}
        status = {element.status} starOnClick={element.starOnClick} notesText = {element.notesText}/>)

    return (
        <div className= "jobsList">
            {array}
        </div>
    )
}

export default JobList; 