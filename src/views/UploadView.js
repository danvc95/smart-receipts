import FileUpload from '../components/FileUpload';
import React, { useState } from 'react';
import TitleBar from '../components/TitleBar';
import { Link } from 'react-router-dom';


const VOCR_KEY = "pk_c8762bce6d654bc3f4f17c2bf983378293275ba483937d1a59e1e26d51735e39ffdcaded872729ada9e90ccd3272c2d00c498d4ae401cf6d87e42bd98ecd9d5e024bfEfDvvqr4MwoQfyRH";



const UploadView = () => {
  const [items, setItems] = useState([]); // Example list of items
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = async (fileUrl) => {
    const endpoint2 = "https://api.jigsawstack.com/v1/vocr";
    const options2 = {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
        "x-api-key": VOCR_KEY, // Replace with your actual API key.
      },
      body: JSON.stringify({
        url: fileUrl,
        prompt:["return the short name of the store", "return the total money spent"]
      }),
    };
    const result2 = await fetch(endpoint2, options2);
    const data2 = await result2.json();
    
    console.log("JigsawStack API response:", data2);

    // Access the 'context' property
    const context = data2.context;

    // Get the first key dynamically
    const firstKey = Object.keys(context)[0];
    const secondKey = Object.keys(context)[1];

    // Extract the value from the array
    const storeName = context[firstKey][0];
    console.log("Store Name:", storeName);

    const totalMoneySpent = context[secondKey][0];
    console.log("Total money spent:", totalMoneySpent);


    setItems([...items, { url: fileUrl, store: storeName, cost: totalMoneySpent }]);
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