import React from 'react'
//need to check props to see if valid, otherwise throw dummy text up 
//need to style 
export default function CasaCard(props) {

    const {house} = props

    return (
        <div className="sm:flex">
            <div className="relative flex-shrink-0 w-36 h-36 rounded-full overflow-hidden md:col-span-1 lg:col-span-2 m-6">
            <img className=" min-h-full " src={house.Image? house.Image : 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80'}/>
            </div>
            <div className="md:col-span-5 lg:col-span-6">
            <h1 className="text-xl font-semibold">{house.Name? house.Name: 'Name TBD'}</h1>
            <h2 className="text-lg italic text-gray-500">{house.Location ? house.Location : 'Location TBD'}</h2>
            <p>{house.Description ? house.Description : 'Description TBD'}</p>
            </div>
        </div>
    )
}