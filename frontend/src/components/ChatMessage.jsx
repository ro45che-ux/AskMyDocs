import ReactMarkdown from "react-markdown";
import SourceCard from "./SourceCard";

const ChatMessage = ({ message }) => {
  return (
    <div className="space-y-5 mb-8">

      {/* User Message */}

      <div className="flex justify-end">

        <div className="max-w-[75%] bg-blue-600 rounded-3xl rounded-br-lg px-5 py-4 shadow-lg">

          <p className="text-xs text-blue-100 mb-2 font-semibold">
            👤 You
          </p>

          <p className="text-white">
            {message.question}
          </p>

        </div>

      </div>

      {/* AI Message */}

      <div className="flex justify-start">

        <div className="max-w-[85%] bg-slate-800 border border-slate-700 rounded-3xl rounded-bl-lg px-6 py-5 shadow-lg">

          <p className="text-green-400 text-sm font-semibold mb-4">
            🤖 AI Research Assistant
          </p>

          <div className="text-white leading-8">
            <ReactMarkdown>
              {message.answer}
            </ReactMarkdown>
          </div>

          {message.sources.length > 0 && (

            <div className="mt-6">

              <p className="text-slate-400 text-sm mb-3">
                📚 Sources
              </p>

              <div className="space-y-2">

                {message.sources.map((source, index) => (
                  <SourceCard
                    key={index}
                    source={source}
                  />
                ))}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ChatMessage;