import React from 'react'
import { useEffect, useState , useRef } from 'react';

export default function Modal(props) {
    //width 100%, height 100%, high z-index 
    
    const [applicationLoading, setApplicationLoading] = useState(null)

    const submitApplication = async () => {
        const response = await fetch('/application', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                uuid: props.data.UUID,
                name: props.data.Name 
            })
        });

        
        const body = await response;

        if (response.status !== 200) {
        console.log(response.status)
        // throw Error(body.message);
        }
        console.log(response.status)
    }

    return (
        
        <div className = "bg-white bg-opacity-100 z-20 w-60 h-60 w-96">
            <p>{props.data.Name}</p>
            <div>
            <button type="submit" onClick={submitApplication}>Apply</button>
            </div> 
            <div>
            <button onClick={props.closeModal}>Cancel</button>
            </div>
        </div>
    )
}
