// import { response } from 'express';
import React, { useState } from 'react';


const NewJobForm = (props) => {
    const [jobInput, setJobInput] = useState("");
    const [companyInput, setCompanyInput] = useState("");
    const [urlInput, setUrlInput] = useState("");

    async function onSubmit(event) {
      event.preventDefault();
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jobTitle: jobInput, companyName: companyInput, jobListingUrl: urlInput}),
        });
        
      
       ;
      const data = await response.json();
      console.log(data);
    }

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