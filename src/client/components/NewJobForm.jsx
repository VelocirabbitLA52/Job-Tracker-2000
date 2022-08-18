// import { response } from 'express';
import React, { useState, useEffect } from 'react';


const NewJobForm = (props) => {
    const [jobInput, setJobInput] = useState("");
    const [companyInput, setCompanyInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [data, setData] = useState([]);

    async function onSubmit(event) {
      event.preventDefault();
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobTitle: jobInput, companyName: companyInput, jobListingUrl: urlInput}),
        });

        const data = await response.json();
       await setData(data);
    
      console.log('this is our data in newjobform', data);
    }

    useEffect( () => {
      onSubmit();
    }, [])

    return (
        <div className = "newJobForm">
          <form onSubmit = {onSubmit}>
            <input type="text"
                   name="jobTitle"
                   placeholder="Enter Job Title"
                   value={jobInput}
                   onChange={(e) => setJobInput(e.target.value)}
                   />
             <input type="text"
                   name="company"
                   placeholder="Enter Company"
                   value={companyInput}
                   onChange={(e) => setCompanyInput(e.target.value)}
                   />
             <input type="text"
                   name="jobListingUrl"
                   placeholder="Enter Job Listing Url"
                   value={urlInput}
                   onChange={(e) => setUrlInput(e.target.value)}
                   />
            <input type="submit" value="Add job"/>
                
          </form>
        </div>
    )
}

export default NewJobForm;