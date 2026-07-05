/*const UploadSection = ({
  selectedFile,
  setSelectedFile,
  uploadPDF,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-semibold text-white mb-5">
        📂 Upload Documents
      </h2>

      <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition">

        <span className="text-5xl mb-3">
          📄
        </span>

        <p className="text-slate-300">
          Drag & Drop PDF here
        </p>

        <p className="text-sm text-slate-500 mt-2">
          or click to browse
        </p>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) =>
            setSelectedFile(e.target.files[0])
          }
        />
      </label>

      {selectedFile && (
        <div className="mt-5 bg-slate-800 rounded-lg px-4 py-3 flex justify-between items-center">
          <span className="text-white">
            📄 {selectedFile.name}
          </span>

          <span className="text-green-400">
            Ready
          </span>
        </div>
      )}

      <button
        onClick={uploadPDF}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl"
      >
        Upload PDF
      </button>

    </div>
  );
};

export default UploadSection;*/

import { useDropzone } from "react-dropzone";

const UploadSection = ({
  selectedFile,
  setSelectedFile,
  uploadPDF,
  uploadedFiles,
}) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-semibold text-white mb-5">
        📂 Upload Documents
      </h2>

      <div
        {...getRootProps()}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center ${
          isDragActive
            ? "border-blue-500 bg-slate-800 scale-[1.02]"
            : "border-slate-600 hover:border-blue-500 hover:bg-slate-800"
        }`}
      >
        <input {...getInputProps()} />

        <div className="text-6xl mb-4">
          📄
        </div>

        <p className="text-white text-lg font-semibold">
          {isDragActive
            ? "Drop your PDF here..."
            : "Drag & Drop your PDF"}
        </p>

        <p className="text-slate-400 mt-2">
          or click to browse
        </p>
      </div>

      {selectedFile && (
        <div className="mt-5 flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3 border border-slate-700">
          <div>
            <p className="text-white font-medium">
              📄 {selectedFile.name}
            </p>

            <p className="text-sm text-green-400">
              Ready to upload
            </p>
          </div>

          <button
            onClick={uploadPDF}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white transition"
          >
            Upload
          </button>
        </div>
      )}

      <hr className="my-6 border-slate-700" />

      <h3 className="text-white font-semibold mb-3">
        📚 Uploaded Documents
      </h3>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {uploadedFiles.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No documents uploaded yet.
          </p>
        ) : (
          uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3"
            >
              <p className="text-white text-sm truncate">
                📄 {file}
              </p>

              <p className="text-green-400 text-xs mt-1">
                ✓ Uploaded
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default UploadSection;