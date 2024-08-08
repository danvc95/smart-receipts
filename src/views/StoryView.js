import React from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/store';


const StoryView = (props) => {
  const { id } = useParams();

  const store = useStore();
  const receipt = store.receiptList[id];


  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <TitleBar
        left={<Link
            to={`/receipt/${id}`} 
          className="p-2 bg-blue-500 text-white rounded text-center hover:bg-blue-600"
        >
          Back
        </Link>}
      />

      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">


        <div>
                <div className="flex flex-col">
            {receipt.zstory.map((item, index) => (
                <div key={index} className="mb-2">
                <span>{item}</span>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default StoryView