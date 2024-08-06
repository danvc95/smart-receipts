// FileUpload.js
import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    console.log('File selected:', file);
    const imageFile = fs.readFileSync(file);
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




  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
          Upload File
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
