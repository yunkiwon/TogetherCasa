
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

  let ref = useRef() 


  //separate function out later
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
  //passed as a prop to the modal component
  const closeModal =() => {
    setShowModal(false)
    setModalData(null)
  }
  

  //list of edge cases: 
    //have already applied 
    //missing data 
    //twilio or airtable down for some reason (error messages) 
    //

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
          {showModal && (
              <div className="fixed flex z-10 inset-0 overflow-y-auto min-h-full bg-gray-500 bg-opacity-75 items-center justify-center"> 
              <div ref={ref} className="">
              <Modal ref={ref} data={modalData} closeModal={closeModal}/>
              </div>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default App;
