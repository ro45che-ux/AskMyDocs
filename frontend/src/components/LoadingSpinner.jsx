const LoadingSpinner = () => {
  return (
    <div className="flex justify-start mb-6">

      <div className="bg-slate-800 border border-slate-700 rounded-3xl rounded-bl-lg px-6 py-5 shadow-lg">

        <p className="text-green-400 text-sm font-semibold mb-3">
          🤖 AI Research Assistant
        </p>

        <div className="flex items-center gap-2">

          <span className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"></span>

          <span
            className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>

          <span
            className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>

        </div>

      </div>

    </div>
  );
};

export default LoadingSpinner;