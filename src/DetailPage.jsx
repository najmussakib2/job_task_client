import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from './Modal';

const DetailPage = () => {
    const { id } = useParams();
    const [Data, setData] = useState(null);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${id}`);
                const productData = await productResponse.json();
                setData(productData.data);

                if (productData.data && productData.data.category) {
                    const categoryResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/${productData.data.category}`);
                    const categoryInfo = await categoryResponse.json();
                    const filteredCategoryData = categoryInfo.data.filter(item => item._id !== id);
                    setCategoryData(filteredCategoryData);

                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    if (!Data || categoryData.length === 0) {
        return <p>Loading......</p>;
    }

    return (
        <div>

            <div className="flex flex-col justify-center items-center my-12 divide-y">
                {Data && (
                    <div className="max-w-5xl ">

                        <div className="grid grid-cols-2 gap-32 items-center">
                            <div>
                                <h1>{Data.name}</h1>
                                <img
                                    className="mb-3"
                                    src={Data.image}
                                />

                                <p className='font-bold'>{Data.description}</p>
                            </div>
                            <div>

                                {/* Hardcoded keys */}

                                <div className='flex justify-between  font-bold'><p className='py-1'>Category:</p><p className='py-1'>{Data.category}</p></div>
                                <div className='flex justify-between font-bold'><p className='py-1'>Price:</p><p className='py-1'>${Data.price}</p></div>
                                {/* Dynamically rendered keys */}
                                {Object.keys(Data).map((key) => {
                                    if (['id', 'name', 'description', 'category', 'price', 'image', '_id'].includes(key)) {
                                        return null;
                                    }
                                    return (
                                        <div key={key} className='flex justify-between font-semibold'>
                                            <p className='py-1'>{key.charAt(0).toUpperCase() + key.slice(1)}:</p>
                                            <p className='py-1'>{Data[key]}</p>
                                        </div>
                                    );
                                })}
                                <div className='text-end mt-3'>
                                    <Modal data={Data} />
                                </div>
                            </div>
                        </div>

                    </div>

                )}

                <div className="w-full mx-auto space-y-8 pt-8 mt-12">
                    <div className="text-start space-y-4">
                        <h2 className=" text-xl font-bold">
                            here are some other {Data?.category}'s products you might like
                        </h2>
                        <div className='md:grid md:grid-cols-4 w-full gap-y-24 gap-x-5'>
                            {categoryData && categoryData.map((data) => (
                                <div key={data._id} className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
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

                    </div>

                </div>
            </div>
            <Link to="/" className='text-end'><p>Go Home---&gt; </p></Link>
        </div>
    );
};

export default DetailPage;