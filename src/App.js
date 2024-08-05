import logo from './logo.svg';
import './App.css';
import { useStore } from './stores/store';

import { InputGroup } from './components/InputGroup';

function App() {

  const store = useStore()

  const { resultState, resultContent } = store

  return (
    <div className="App">

      <div class="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
        <h1 class="text-3xl font-bold mb-6">
          Streaming JigsawStack's API Completions in JavaScript
        </h1>
        <div id="resultContainer" class="mt-4 h-48 overflow-y-auto">
          <p class="text-gray-500 text-sm mb-2">
            {resultState === "WAITING" &&
              "Waiting for input..."
            }

            {resultState === "LOADING" &&
              "Generating..."
            }

            {resultState === "ABORT" &&
              "Request aborted"
            }

            {resultState === "ERROR" &&
              "Error occurred while generating"
            }

            {resultState === "SUCCESS" &&
              resultContent
            }
          </p>
          <p id="resultText" class="whitespace-pre-line"></p>
        </div>
        <InputGroup />
      </div>
    </div>
  );
}

export default App;
