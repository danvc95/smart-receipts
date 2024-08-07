import FileUpload from '../components/FileUpload';
import React, { useContext, useState } from 'react';
import TitleBar from '../components/TitleBar';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/store';


const ListView = () => {
 // const [items, setItems] = useState([]); // Example list of items
  const [searchTerm, setSearchTerm] = useState('');

  //const filteredItems = items.filter(item =>
   // item.url.toLowerCase().includes(searchTerm.toLowerCase())
  //);

  const store = useStore();

  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <TitleBar 
        right={<Link to={'/upload'}>Add Receipt</Link>}
      />

      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-4 border rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
    <div>
      <span className="text-sm text-gray-600">Number of Receipts: {store.receiptList.length}</span>
      {store.receiptList.length > 0 ? (
        <div className="max-h-64 overflow-y-auto">
          <ul className="pl-5">
            {store.receiptList.map((item, index) => (
              <div key={index} className="mb-2 border-b border-gray-300">
                <li className="flex items-center py-2">
                  <Link to={`/receipt/${index}`} className="flex items-center w-full">
                    <img src={item.receiptImageURL} alt={`Thumbnail ${index}`} className="w-16 h-w16 object-cover rounded" />
                    <span className="ml-4">{item.storeName}</span>
                    <span className="ml-4">{item.purchaseDate}</span>
                    <span className="ml-4">${item.priceTotal}</span>
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 mb-4">Upload your first receipt :-)</p>
          <Link to={'/upload'}>Add Receipt</Link>
        </div>
      )}
    </div>

      </div>
    </div>
  )
}


export default ListView;