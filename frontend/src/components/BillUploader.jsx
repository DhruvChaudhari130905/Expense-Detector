import { useState } from 'react';

export default function BillUploader({ onScanComplete }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/scan-bill', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to analyze bill');
            }

            const data = await response.json();
            onScanComplete(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Scan New Bill</h2>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="bill-upload"
                />
                <label
                    htmlFor="bill-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                >
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                    <span className="text-slate-600 font-medium my-2">
                        {file ? file.name : "Click to upload bill image"}
                    </span>
                    <span className="text-xs text-slate-400">Supports JPG, PNG</span>
                </label>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold text-white transition-all
          ${(!file || uploading)
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                    }`}
            >
                {uploading ? 'Analyzing with AI...' : 'Scan Bill'}
            </button>
        </div>
    );
}
