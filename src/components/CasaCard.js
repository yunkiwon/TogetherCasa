import React from 'react'
//need to check props to see if valid, otherwise throw dummy text up 
//need to style 
export default function CasaCard(props) {
    return (
        <div>
            <h1>{props.house.Name}</h1>
            <p>{props.house.Description}</p>
        </div>
    )
}
