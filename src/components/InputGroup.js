import { useRef, useState } from "react"
import { useStore } from "../stores/store"

const API_URL = "https://api.jigsawstack.com/v1/prompt_engine";
const API_KEY = "sk_418975ff619a660239f59c891cba27852c83ec4cae64137e19fef310986997c8ff3e460132e8c84c68695b771c5d8a8bc98f9001d7f5c1078238189121be27a9024Yp6SeEXpM4XHRkBhAd";


function InputGroup() {
  const promptInput = useRef(null)
  const generateBtn = useRef(null)
  const stopBtn = useRef(null)

  const store = useStore()
  const { setResultState, setResultContent } = store

  let controller = null; // Store the AbortController instance

  const generate = async () => {
    setResultState("LOADING")

    if (!promptInput.current.value) {
      alert("Please enter a prompt.");
      return;
    }

    // Disable the generate button and enable the stop button
    generateBtn.disabled = true;
    stopBtn.disabled = false;

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;

    try {
      const endpoint = "https://api.jigsawstack.com/v1/prompt_engine";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY, // Replace with your actual API key.
        },
        body: JSON.stringify({
          prompt: "Tell me a story about {about}",
          inputs: [
            {
              key: "about",
              optional: false,
              initial_value: "Leaning Tower of Pisa",
            },
          ],
          return_prompt: "Return the result in a markdown format",
        }),
      };
      const result = await fetch(endpoint, options);
      const data = await result.json();

      const prompt_engine_id = data.prompt_engine_id
      console.log("id", prompt_engine_id)

      const endpoint2 = `https://api.jigsawstack.com/v1/prompt_engine/${prompt_engine_id}`
      console.log(endpoint2)

      const options2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY, // Replace with your actual API key.
      },
      body: JSON.stringify({
        input_values: {
          about: promptInput,
        },
      }),
      };
      const result2 = await fetch(endpoint2, options2);
      const data2 = await result2.json();
      console.log(data2)

      setResultState("SUCCESS");
      setResultContent(data2.result)

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
        placeholder="Enter prompt..."
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