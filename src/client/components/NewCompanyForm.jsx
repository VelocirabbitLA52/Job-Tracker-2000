import React ,{ useState, useEffect } from 'react';
import JobList from './JobList';

const NewCompanyForm = (props) => {
  const [companyInput, setCompanyInput] = useState("");
  const [data, setData] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        companyName: companyInput}),
      });

      const companyList = await response.json();
      
  
    console.log('this is our data in newCOMPANYform', data);

    const newCompanyList = companyList.map(element => {
      const newElement = {jobTitle: element.jobtitle,
      companyName: element.company_name,
      jobListingUrl: element.url,
      dateCreated: element.datecreated,
      starred: element.starred,
      status: element.status,
      notesText: element.note,};
      return newElement;    
    });

    setData(newCompanyList);
  }




  useEffect( () => {
    onSubmit();
  }, [])

  return (
      <div className = "newCompanyForm">
        <form onSubmit = {onSubmit}>
            <input type="text"
                  name="company"
                  placeholder="Search by Company..."
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  />
          <input type="submit" value="Search"/>
        </form>

        <section>
          <JobList testList={data} />
        </section>
      </div>
  )
}

export default NewCompanyForm;