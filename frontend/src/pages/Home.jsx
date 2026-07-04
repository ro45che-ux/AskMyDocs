import { useState } from "react";
import api from "../services/api";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);

  const uploadPDF = async () => {
    if (!selectedFile) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/upload", formData);

      console.log(response.data);

      alert(
        `✅ Uploaded Successfully!\n\nPages: ${response.data.pages}\nChunks: ${response.data.chunks}`
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      const response = await api.post("/chat", {
        question: question,
      });

      console.log(response.data);

      setAnswer(response.data.answer);
      setSources(response.data.sources);
    } catch (error) {
      console.error(error);
      alert("Failed to get answer.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>🤖 AI Research Assistant</h1>

      <hr />

      <h2>Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadPDF}>Upload</button>

      <hr />

      <h2>Ask Question</h2>

      <input
        type="text"
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button onClick={askQuestion}>Ask</button>

      <hr />

      <h2>Answer</h2>

      <p>{answer || "AI response will appear here..."}</p>

      {sources.length > 0 && (
        <>
          <h3>Sources</h3>

          <ul>
            {sources.map((source, index) => (
              <li key={index}>
                📄 {source.filename} - Page {source.page}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;