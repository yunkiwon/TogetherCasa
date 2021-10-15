import React from 'react'
import { useEffect, useState , useRef } from 'react';

export default function Modal(props) {
    //width 100%, height 100%, high z-index 
    
    const [applied, setApplied] = useState(null)
    const [error, setError] = useState(null)

    // Checks to see if user has already applied to this UUID
    useEffect(() => {
        if(props.data.applied){
            setApplied(true)
            console.log(applied)
        };
      }, [props]);

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
            setError(true)
            console.log(error)
             // throw Error(body.message);
        }
        else{
            console.log(response.status)
            setApplied(true)
            props.onApplied(props.data.UUID)
        }
    }

    return (
        //onhover: #DFE5E7 and font white 
        //
        
        <div className = "flex flex-col bg-white w-full h-full rounded-md bg-opacity-100 z-20">
            <div className="mx-8 my-6">
                <p className="w-full text-lg font-semibold my-2"> Contact {props.data.Name}</p>
                        <div className="my-2">
                            <p className="text-red-400">{error ? 'There was an error, please try again later' : ""}</p>
                        </div>
                <div className="mt-4">
                    <button className={`font-semibold mr-4 w-24 h-14 rounded-md text-white border-0 ${applied ? 'bg-green-400':'bg-red-500 hover:bg-specifiedHover hover:text-black'}`} disabled={applied} type="submit" onClick={submitApplication}>
                        {applied ? 'Applied!': 'Apply'}
                    </button>
                    <button className="font-semibold mr-4 w-24 h-14 rounded-md hover:bg-specifiedHover border-0" type="submit" onClick={props.closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}