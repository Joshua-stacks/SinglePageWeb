import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h2>Daily Tasks</h2>
        <ul>
          <li>
            <a href="https://form.jotform.com/231564559832262">
              Inventory Adjustment form
            </a>
          </li>
          <li>
            <a href="https://submit.jotform.com/231506304261242">
              Inventory Count
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
