import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



function App() {

  const [allData, setAllData] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/v1')
      .then(res => res.json())
      .then(data => {
        setAllData(data.data);
      }).catch(e => console.log(e.message));
  }, [])

  console.log(allData)
  if (typeof allData !== 'undefined' && allData.length === 0) {
    return <p>Loading......</p>;
  }
  return (
    <>
      <div className='mb-20'>
        <h1 className='font-bold text-3xl'>Welcome To My Shop</h1>
        <p>single page e-commerce website</p>
      </div>
      <div className='md:grid md:grid-cols-3 gap-y-24 gap-x-5'>
        {allData && allData.map((data) => (
          <div key={data._id} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div
              className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img className='block object-cover mx-auto h-56'
                src={`${data.image}`}
                alt="card-image" />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {data.name}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {data.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link to={`/detailPage/${data._id}`}>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}

      </div>



    </>
  )
}

export default App


