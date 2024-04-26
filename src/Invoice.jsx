

const Invoice = ({ pdfRef, data, date }) => {


    return (
        <div>

            <div
                ref={pdfRef}
                className="p-8 max-w-lg  mx-auto bg-white">
                <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800">Invoice</h1>
                        <p className="text-lg text-gray-600">Invoice ID: {data._id}</p>
                        <p className="text-lg text-gray-600">Date: {date}</p>
                    </div>
                <table className="w-full mb-6 text-center">
                    <thead>
                        <tr>
                            <th className="py-3 text-lg font-semibold text-gray-700">Description</th>
                            <th className="py-3 text-lg font-semibold text-gray-700">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((key) => {
                            if (['id', 'description', 'image', '_id', 'stock'].includes(key)) {
                                return null;
                            }
                            return (
                                <tr key={key}>
                                    <td className='border py-1 text-lg text-gray-700'>{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                                    <td className='border py-1 text-lg text-gray-700'>{data[key]}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
                <div className="flex justify-end">
                    <div className="w-1/3">
                        
                        <p className="text-lg text-right text-gray-700">
                            <span className="font-semibold">Total: </span>$ {data.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;