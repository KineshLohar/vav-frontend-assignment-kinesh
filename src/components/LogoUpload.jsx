import React, { useRef, useState } from 'react';

const LogoUpload = () => {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log("File dropped:", e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="max-w-xl font-sans max-w-xs">
            <h2 className=" font-semibold text-gray-800 mb-4">Logo Upload</h2>

            <div
                className={`relative flex flex-col items-center justify-center w-full p-5 text-center border-2 border-dashed rounded-3xl transition-all cursor-pointer
          ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-transparent"}
          hover:border-indigo-400 hover:bg-slate-50`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => console.log("File selected:", e.target.files[0])}
                />

                <div className="mb-2 text-slate-600">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                </div>

                <p className=" text-sm font-medium text-neutral-500">
                    <span className="text-neutral-600 font-bold">Browse photo</span> or drop here
                </p>
                <p className="text-xs text-slate-500 mt-1 text-center">
                    A photo larger than 400 pixels work best.
                </p>
                <p className="text-xs text-neutral-500 text-center">
                    Max file size 5 MB.
                </p>
            </div>
        </div>
    );
};

export default LogoUpload;