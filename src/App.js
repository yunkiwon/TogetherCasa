import { useEffect, useState } from 'react';

import CasaCard from './components/CasaCard.js'
import Modal from './components/Modal.js'

function App() {
  const [ casaListings, setCasaListings ] = useState(null);
  const [ showModal, setShowModal ] = useState(false); 
  const [ modalData, setModalData ] = useState(null)

  useEffect(() => {
    fetchAvailableCasas();
  }, []);

  const fetchAvailableCasas = async () => {
    const response = await fetch('/rental-data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    setCasaListings(body)
    console.log(body)
  }

  const applyToCasa = (house) => {
    setShowModal(true)
    setModalData(house)
    console.log(house)
  }

  //instead of welcomemessage, get the airtable data --> .map and get as list first 
  //styling later (e.g. placeholder images and text depending on data)
  //'apply' button with action via modal 
  //once applied, should be greyed out to prevent double applications \

  //list of edge cases: 
    //have already applied 
    //missing data 
    //twilio or airtable down for some reason (error messages) 
    //

  return (
    <div className="App">
      <header className="App-header">
        {casaListings && casaListings.map((house, key) => (
          <div onClick={() => applyToCasa(house)}>
          <CasaCard house={house} key={house.UUID}/>
          </div>
        ))}
        <p>
          {showModal && (
            <Modal data={modalData}/>
          ) }
        </p>
      </header>
    </div>
  );
}

export default App;
