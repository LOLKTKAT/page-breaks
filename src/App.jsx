import "./App.css";
import { useEffect, useState } from "react";

const PAGE_HEIGHT = 1123;
function App() {
  const [count, setCount] = useState(0); // Proper state initialization
  const [childrenCount, setChildrenCount] = useState(0); // State to track changes

  useEffect(() => {
    const parent = document.getElementById("perent");
    const printArea = document.getElementById("print-area");

    if (parent && printArea) {
      const maxWrapperHeight = PAGE_HEIGHT; // Adjust this to set the maximum height per wrapper
      let currentHeight = 0;
      printArea.innerHTML = ""; // Clear previous content
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
  }, [childrenCount]); // Trigger the effect when childrenCount changes

  // Observe changes in the parent element's children
  useEffect(() => {
    const parent = document.getElementById("perent");

    if (parent) {
      const observer = new MutationObserver(() => {
        setChildrenCount(parent.children.length);
      });

      observer.observe(parent, { childList: true });

      return () => observer.disconnect(); // Cleanup observer on unmount
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
          <div className="" key={index}>
            This is item {index + 1}
          </div>
        ))}
      </div>
      <div id="print-area" className="">
        {/* Content will be grouped and displayed here */}
      </div>
    </>
  );
}

export default App;
