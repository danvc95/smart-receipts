import { useRef, useState } from "react"
import { useStore } from "../stores/store"
import React, { Component } from 'react'

const API_URL = "https://api.jigsawstack.com/v1/prompt_engine";
const API_KEY = "pk_c8762bce6d654bc3f4f17c2bf983378293275ba483937d1a59e1e26d51735e39ffdcaded872729ada9e90ccd3272c2d00c498d4ae401cf6d87e42bd98ecd9d5e024bfEfDvvqr4MwoQfyRH";


function InputGroup() {
  const promptInput = useRef(null)
  const promptInput2 = useRef(null)
  const generateBtn = useRef(null)
  const stopBtn = useRef(null)

  const store = useStore()
  const { setResultState, setResultContent } = store

  let controller = null; // Store the AbortController instance

  const generate = async () => {
    setResultState("LOADING")

    if (!promptInput.current.value) {
      alert("Please enter an image url.");
      return;
    }

    if (!promptInput2.current.value) {
      alert("Please select a file to upload");
      return;
    } 

    // Disable the generate button and enable the stop button
    generateBtn.disabled = true;
    stopBtn.disabled = false;

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;

    try {
       
      const endpoint = "https://api.jigsawstack.com/v1/vocr";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY, 
        },
        body: JSON.stringify({
          url: promptInput.current.value,
        }),
      };


      const result = await fetch(endpoint, options);
      const data = await result.json();


      console.log("id", data)

      setResultState("SUCCESS");
      setResultContent(data.context)

      // const endpoint = "https://api.jigsawstack.com/v1/prompt_engine/"

      // setResultContent();

      

    } catch (error) {
      // Handle fetch request errors
      if (signal.aborted) {
        console.log("Request was aborted");
        setResultState("ABORT");
      } else {
        console.error("Error:", error);
        setResultState("ERROR");
      }
    } finally {
      // Enable the generate button and disable the stop button
      setResultState("SUCCESS");
      generateBtn.disabled = false;
      stopBtn.disabled = true;
      controller = null; // Reset the AbortController instance
    }
  }

  return (
    <div
      className="inputGroup"
    >
      <input
        ref={promptInput}
        type="text"
        id="promptInput"
        class="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
        placeholder="Image URL"
      />
      <input
        ref={promptInput}
        type="text"
        id="promptInput2"
        class="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
        placeholder="Select a file to upload"
      />


      <div class="flex justify-center mt-4">
        <button
          ref={generateBtn}
          id="generateBtn"
          onClick={generate}
          class="w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          "Generate"
        </button>
        <button
          ref={stopBtn}
          id="stopBtn"
          disabled
          class="w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          Stop
        </button>
      </div>
    </div>
  )
}

export { InputGroup }