const Navbar = () => {
  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">
          🤖 AI Research Assistant
        </h1>

        <p className="text-slate-400 text-sm sm:text-base text-center">
          Powered by <span className="text-blue-400">Gemini</span> +{" "}
          <span className="text-green-400">ChromaDB</span>
        </p>

      </div>

    </nav>
  );
};

export default Navbar;