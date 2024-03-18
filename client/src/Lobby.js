import io from "socket.io-client";
import "./Lobby.css";
import { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";

const socket = io.connect("http://real-time-web-app-production.up.railway.app");
const codeBlocks = [
  {
    title: "Calculate the Sum of Two Numbers",
    details: `function sum(a, b) {
  // Write a function that takes two numbers as input and returns their sum.
}`,
    solution: `function sum(a, b) {
  return a + b;
}`,
  },
  {
    title: "Check if a String Contains a Substring",
    details: `function containsSubstring(str, sub) {
      //  Write a function that takes a string and a substring as input and returns whether the string contains the substring.
    }`,
    solution: `function containsSubstring(str, sub) {
            return str.includes(sub);
          }`,
  },
  {
    title: "Filter Even Numbers",
    details: `function filterEvenNumbers(arr) {
        //   Write a function that takes an array of numbers as input and returns a new array containing only the even numbers.
      }`,
    solution: `function filterEvenNumbers(arr) {
            return arr.filter(num => num % 2 === 0);
          }`,
  },
  {
    title: "Check if Even",
    details: `function checkIfEven(num) {
          //  Write a function that takes a number as input and returns a boolean indicating whether it is even.
        }`,
    solution: `function checkIfEven(num) {
            return num % 2 === 0 ? true : false;
          }`,
  },
];

function Lobby() {
  const [selectedCodeBlock, setSelectedCodeBlock] = useState({});
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [isMentor, setIsMentor] = useState(false);

  const handleClick = (codeBlock) => {
    setSelectedCodeBlock(codeBlock);
    socket.emit("choose_codeBlock", codeBlock.title);
    setShowCodeBlock(true);
  };

  useEffect(() => {
    socket.on("mentor_status", (status) => {
      setIsMentor(status);
    });
  });

  return (
    <div className="Lobby">
      {!showCodeBlock ? (
        <div className="codeBlock-container">
          <h3>Welcome</h3>
          <h4>Choose code block</h4>
          <ul>
            {codeBlocks.map((block, index) => (
              <li key={index}>
                <button onClick={() => handleClick(block)}>
                  {block.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <CodeBlock
          socket={socket}
          selectedCodeBlock={selectedCodeBlock}
          isMentor={isMentor}
        />
      )}
    </div>
  );
}

export default Lobby;
