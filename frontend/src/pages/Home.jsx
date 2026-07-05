import { useState, useEffect, useRef } from "react";

import api from "../services/api";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import UploadSection from "../components/UploadSection";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const uploadPDF = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/upload", formData);

      toast.success(response.data.message);

      setUploadedFiles((prev) => [
        ...prev,
        response.data.filename,
      ]);

      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/chat", {
        question,
      });

      setMessages((prev) => [
        ...prev,
        {
          question,
          answer: response.data.answer,
          sources: response.data.sources,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to get answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Sidebar */}

          <div className="lg:col-span-3">

            <UploadSection
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              uploadPDF={uploadPDF}
              uploadedFiles={uploadedFiles}
            />

          </div>

          {/* Chat */}

          <div className="lg:col-span-9">

            <div className="bg-slate-900 border border-slate-700 rounded-2xl h-[78vh] flex flex-col">

              {/* Messages */}

              <div className="flex-1 overflow-y-auto p-6">

                {messages.length === 0 && !loading && (
                  <div className="h-full flex items-center justify-center text-slate-500 text-lg">
                    Start chatting with your PDFs 🚀
                  </div>
                )}

                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message}
                  />
                ))}

                {loading && (
                  <LoadingSpinner />
                )}

                <div ref={bottomRef} />

              </div>

              {/* Sticky Input */}

              <div className="border-t border-slate-700 p-5">

                <ChatInput
                  question={question}
                  setQuestion={setQuestion}
                  askQuestion={askQuestion}
                  loading={loading}
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;