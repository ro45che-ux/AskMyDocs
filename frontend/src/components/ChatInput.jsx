const ChatInput = ({
  question,
  setQuestion,
  askQuestion,
  loading,
}) => {
  return (
    <div className="flex items-center gap-4">

      <input
        type="text"
        placeholder="Ask anything about your uploaded PDFs..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            askQuestion();
          }
        }}
        className="flex-1 bg-slate-800 border border-slate-600 focus:border-blue-500 outline-none rounded-full px-6 py-4 text-white placeholder-slate-400 transition"
      />

      <button
        onClick={askQuestion}
        disabled={loading}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 transition flex items-center justify-center text-2xl text-white shadow-lg"
      >
        {loading ? "..." : "➤"}
      </button>

    </div>
  );
};

export default ChatInput;