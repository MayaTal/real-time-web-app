import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function CodeBlock({ socket, selectedCodeBlock, isMentor }) {
  const [currentCode, setCurrentCode] = useState(selectedCodeBlock.details);
  const [outputCode, setOutputCode] = useState("");

  const sendCode = async (data) => {
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
      //   setCurrentCode("");
    }
  };

  const sendSolution = () => {
    if (currentCode === selectedCodeBlock.solution) {
      console.log("great");
    }
  };

  useEffect(() => {
    socket.off("receive_code").on("receive_code", (data) => {
      setOutputCode(data);
    });
  }, [socket]);

  return (
    <div className="code-window">
      <div className="code-header">
        <p>{selectedCodeBlock.title}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {!isMentor ? (
            <div className="code">
              <textarea
                id="input"
                type="text"
                value={currentCode}
                rows={10}
                cols={40}
                onChange={(event) => {
                  sendCode(event.target.value);
                }}
              />
            </div>
          ) : (
            <textarea
              id="input"
              type="text"
              value={outputCode}
              rows={10}
              cols={40}
              readOnly={true}
            />
          )}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <button onClick={sendSolution}>Submit code</button>
      </div>
    </div>
  );
}

export default CodeBlock;
