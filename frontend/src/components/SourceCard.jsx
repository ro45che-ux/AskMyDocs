const SourceCard = ({ source }) => {
  return (
    <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mt-2 hover:bg-slate-700 transition">
      <div>
        <p className="text-white font-medium">
          📄 {source.filename}
        </p>

        <p className="text-sm text-slate-400">
          Page {source.page}
        </p>
      </div>

      <span className="text-green-400 text-sm font-semibold">
        Source
      </span>
    </div>
  );
};

export default SourceCard;