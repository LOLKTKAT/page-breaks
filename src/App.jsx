import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0); // Proper state initialization

  useEffect(() => {
    const parent = document.getElementById("perent");
    const printArea = document.getElementById("print-area");
    let children = parent.children;

    if (parent && printArea) {
      const maxWrapperHeight = 200; // Adjust this to set the maximum height per wrapper
      let currentHeight = 0;
      let wrapper = document.createElement("div");
      wrapper.className = "wrapper";

      Array.from(parent.children).forEach((child) => {
        const clone = child.cloneNode(true);

        // Temporarily add clone to measure its height
        printArea.appendChild(clone);
        const childHeight = clone.offsetHeight;
        printArea.removeChild(clone);

        // Check if adding the current element exceeds maxWrapperHeight
        if (currentHeight + childHeight > maxWrapperHeight) {
          // Append the completed wrapper to printArea
          printArea.appendChild(wrapper);

          // Start a new wrapper
          wrapper = document.createElement("div");
          wrapper.className = "wrapper";
          currentHeight = 0;
        }

        // Add the cloned child to the wrapper and update the current height
        wrapper.appendChild(clone);
        currentHeight += childHeight;
      });

      // Append the last wrapper if it contains any children
      if (wrapper.children.length > 0) {
        printArea.appendChild(wrapper);
      }
    }
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Add Element</button>
      <div id="perent" className="hidden bg-red-400">
        <div className="content">content </div>
        <div className="content">content </div>
        <div className="content">content </div>
        <div className="content">content </div>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>This is item {index + 1}</div>
        ))}
      </div>
      <div id="print-area" className="">
        {/* Content will be grouped and displayed here */}
      </div>
    </>
  );
}

export default App;
