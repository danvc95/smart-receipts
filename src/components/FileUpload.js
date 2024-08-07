import React, { useState } from 'react';
import {FILE_KEY, VOCR_KEY} from '../keys';
import { useStore } from '../stores/store';

import { uploadFile } from '../utils/upload';
import { performVOCR } from '../utils/vocr';

import { useNavigate } from 'react-router-dom';


const FileUpload = ({onFileUpload}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [itemsCounter, setItemsCounter] = useState(0); // State for items counter
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('Selected file:', event.target.files[0]);
  };

  const navigate = useNavigate();

  const { addReceipt } = useStore();

  const handleFileUpload = async () => {
    // uploadResponse: file URL
    const uploadResponse = await uploadFile(selectedFile)
    // VOCRResponse: receipt object
    const VOCRResponse = await performVOCR(uploadResponse)

    addReceipt(VOCRResponse)

    navigate('/')
  }


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





