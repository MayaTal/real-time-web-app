import React, { useEffect, useState } from "react";
import "./CodeBlock.css";
import smiley from "./smile.png";

function CodeBlock({ socket, selectedCodeBlock, isMentor }) {
  const [currentCode, setCurrentCode] = useState(selectedCodeBlock.details);
  const [outputCode, setOutputCode] = useState("");
  const [isCorrectSolution, setIsCorrectSolution] = useState(false);

  const sendCode = async (data) => {
    console.log(data);
    setCurrentCode(data);
    if (data !== "") {
      const codeData = {
        title: selectedCodeBlock.title,
        message: data,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_code", codeData);
    }
  };

  const sendSolution = () => {
    if (
      currentCode.split(" ").join("") ===
      selectedCodeBlock.solution.split(" ").join("")
    ) {
      setIsCorrectSolution(true);
      console.log("great");
    }
  };

  useEffect(() => {
    socket.off("receive_code").on("receive_code", (data) => {
      setOutputCode(data);
    });
  }, [socket]);

  return (
    <div className="codeBlock">
      <div className="code-header">
        <h3>{selectedCodeBlock.title}</h3>
      </div>
      <div className="code-body">
        {!isMentor ? (
          <div className="textarea-container">
            <textarea
              id="input"
              type="text"
              value={currentCode}
              onChange={(event) => {
                sendCode(event.target.value);
              }}
              readOnly={isCorrectSolution}
            />
            {isCorrectSolution && (
              <img src={smiley} alt="Smiley" className="smiley" />
            )}
          </div>
        ) : (
          <textarea
            id="input"
            type="text"
            placeholder={currentCode}
            value={outputCode}
            readOnly={true}
          />
        )}
      </div>
      <div className="code-footer">
        {!isMentor && !isCorrectSolution && (
          <button onClick={sendSolution}>Submit code</button>
        )}
      </div>
    </div>
  );
}

export default CodeBlock;
