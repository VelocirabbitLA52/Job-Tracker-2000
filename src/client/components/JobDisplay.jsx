import React, { useEffect } from 'react';



const JobDisplay = (props) => {
    useEffect(() => {
        console.log("PROPS STATUS IN JOB DISPLAY: ", document.getElementById(props.status));
        const statusElement = document.getElementById(props.status);
        // statusElement.setAttribute("selected","selected");
    }, []); 
    return (
        <div className="jobDisplay card">
            <div className="card-body">
                <div className="left">
                    <h3>
                        <button className="bi-star"></button>
                        <a href={props.jobListingUrl}>{props.jobTitle}</a>
                    </h3>
                    <a href='#'>{props.companyName}</a><br/>
                    date saved: {props.dateLastChecked}<br/><br/>
                </div>
                <div className="right">
                    <label htmlFor="status">Status:</label>
                    <select className="form-select" name="status" id="status">
                        <option value="interested" id="interested">
                            Interested
                        </option>
                        <option value="applied" id="applied">
                            Applied
                        </option>
                        <option value="interviewing" id="interviewing">
                            Interviewing
                        </option>
                        <option value="declined" id="declined">
                            Declined
                        </option>
                    </select>
                    <label htmlFor="notesField">Notes:</label>
                    <div contentEditable="true" id="notesField">
                    {props.notesText}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobDisplay;