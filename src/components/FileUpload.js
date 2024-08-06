import React, { useState } from 'react';
import {FILE_KEY} from '../keys'




const FileUpload = ({onFileUpload}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [itemsCounter, setItemsCounter] = useState(0); // State for items counter
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('Selected file:', event.target.files[0]);
  };


  const handleFileUpload = async () => {
    if (selectedFile) {
      console.log("Submitting file")

      const key = selectedFile.name;
      const endpoint = `https://api.jigsawstack.com/v1/store/file?key=${key}&overwrite=true`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
          "x-api-key": FILE_KEY, // Replace with your actual API key.
        },
        body: selectedFile,
      };
      const result = await fetch(endpoint, options);
      const data = await result.json();

      const fileUrl = `${data.url}?x-api-key=${FILE_KEY}`;
      console.log("public url:", fileUrl);


      console.log("public url:", `${data.url}?x-api-key=${FILE_KEY}`);
      setItemsCounter(itemsCounter + 1);
      if(onFileUpload){
        onFileUpload(fileUrl);
      }
      setSelectedFile(null);




    }
  };



  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="file-upload" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#000', color: '#fff', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
        Select File
      </label>
      <input 
        id="file-upload" 
        type="file" 
        accept="image/*"
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      {selectedFile && (
        <div>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected file" style={{ width: '200px', Radius: '8px' }} />

          <button style={{ padding: '10px 10px', backgroundColor: '#000', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}
            onClick={handleFileUpload}
          >
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};


export default FileUpload;





// FileUpload.js
// import React, { useState } from 'react';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleUpload = () => {
//     console.log('File selected:', file);
//     const imageFile = fs.readFileSync(file);



    // const key = "up.png";
    // const endpoint = `https://api.jigsawstack.com/v1/store/file?key=${key}&overwrite=true`;
    // const options = {
    // method: "POST",
    // headers: {
    //     "Content-Type": "image/png",
    //     "x-api-key": "<your-api-key>", // Replace with your actual API key.
    // },
    // body: imageFile,
    // };
    // const result = await fetch(endpoint, options);
    // const data = await result.json();

    // console.log("public url:", `${data.url}?x-api-key=${publicKey}`);




//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
//           Upload File
//         </label>
//         <input
//           type="file"
//           id="file"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//       </div>
//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
//       >
//         Upload
//       </button>
//     </div>
//   );
// };

// export default FileUpload;
