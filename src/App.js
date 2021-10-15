
import { useEffect, useState , useRef } from 'react';
import CasaCard from './components/CasaCard.js'
import Modal from './components/Modal.js'

function App() {
  const [ casaListings, setCasaListings ] = useState(null);
  const [ showModal, setShowModal ] = useState(false); 
  const [ modalData, setModalData ] = useState(null)

  useEffect(() => {
    fetchAvailableCasas();
  }, []);


  //Detecting mouseclicks outside of the referenced modal 
  let ref = useRef() 

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },

      [ref, handler]
    );
  }

  useOnClickOutside(ref, () => setShowModal(false));

  //Fetching list of casas from airtable (presorted 'ready' table)
  const fetchAvailableCasas = async () => {
    const response = await fetch('/rental-data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    setCasaListings(body)
    console.log(body)
  }

  const openModal = (house) => {
    setShowModal(true)
    setModalData(house)
  }


  //for closing via button click rather than outside click 
  const closeModal =() => {
    setShowModal(false)
    setModalData(null)
    console.log(casaListings)
  }
  
  //once applied, the user should not be able to apply again. adds a 'applied' property 
  //to the state object and sets as 'true'. later can connect to user's sessionID / uuid

  const onApplied = (uuid) => {
    console.log(uuid)
    setCasaListings(casaListings.map(casa => {
         if(casa.UUID !== uuid) return casa
         return {...casa, applied: true}
    }))
}


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="grid sm:grid-cols-1 md:grid-cols-8 m-8">
        <div className="md:col-start-2 col-span-6">
      <div className="mt-16 text-2xl font-semibold text-yellow-500">
        <h1>Featured Casas:</h1>
      </div>
        {casaListings && casaListings.map((house, key) => (
          <div className="hover:shadow-lg drop-shadow-xl  my-4 border-2 py-4 px-4 border-gray-200 rounded-lg" onClick={() => openModal(house)}>
          <CasaCard house={house} key={house.UUID}/>
          </div>
        ))}
      </div>
      </div>
      {showModal && (
              <div className="fixed flex z-10 inset-0 overflow-y-auto min-h-full backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-60 items-center justify-center"> 
                <div ref={ref} className="w-3/5">
                  <Modal data={modalData} closeModal={closeModal} onApplied={onApplied}/>
                </div>
            </div>
          )}  
    </div>
  );
}

export default App;
