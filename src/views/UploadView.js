import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import TitleBar from '../components/TitleBar';
import { Link } from 'react-router-dom';
import {VOCR_KEY} from '../keys';
import {useStore} from '../stores/store';


const UploadView = () => {
  const [items, setItems] = useState([]); // Example list of items
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = async (fileUrl) => {

    //setItems([...items, { url: fileUrl, store: storeName, cost: totalMoneySpent }]);
  };

  const filteredItems = items.filter(item =>
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex flex-col items-center p-4  gap-2">
      <TitleBar
        left={<Link to="/">Home</Link>}
      >
      </TitleBar>

      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <FileUpload onFileUpload={handleFileUpload} />
      </div>
    </div>
  )

}

export default UploadView;