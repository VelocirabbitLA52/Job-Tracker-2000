import React from 'react';
import CompanyDisplay from './CompanyDisplay';


const CompanyList = (props) => {


    return (

        <div className = "companyList">
           <CompanyDisplay/>
        </div>

    )
}


// const JobList = (props) => {
//     const jobs = props.testList;
//     console.log('JobList:',props.testList)
//     const array = jobs.map(element => <JobDisplay jobTitle = {element.jobTitle} companyName= {element.companyName}
//         jobListingUrl = {element.jobListingUrl} dateCreated = {element.dateCreated} starred= {element.starred}
//         status = {element.status} starOnClick={element.starOnClick} notesText = {element.notesText}/>)

//     return (
//         <div className= "jobsList">
//             {array}
//         </div>
//     )
// }

export default CompanyList;