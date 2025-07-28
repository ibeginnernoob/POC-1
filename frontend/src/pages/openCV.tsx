import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Upload,
    Download,
    Camera,
    File,
    X,
    Home,
    DraftingCompass,
    DownloadIcon,
} from 'lucide-react';
import { set } from 'date-fns';

export default function OpenCV() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [uploadImgSrc, setUploadImgSrc] = useState<string | null>(null);
    const [resultImageURL, setResultImageURL] = useState<string | null>(null);
    const [csvDataLink, setCsvDataLink] = useState<string | null>(null);
    const [resultImageLink, setResultImageLink] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [pageState, setPageState] = useState<'land' | 'upload' | 'result'>(
        'land'
    );

    useEffect(() => {
        return () => {
            // Clean up the object URL when the component unmounts
            if (uploadImgSrc) {
                URL.revokeObjectURL(uploadImgSrc);
            }
            if (resultImageURL) {
                URL.revokeObjectURL(resultImageURL);
            }
        };
    }, []);

    useEffect(() => {
        if (pageState === 'land') {
            setUploadImgSrc(null);
            setUploadImage(null);
            setResultImageLink(null);
            setCsvDataLink(null);
            setResultImageURL(null);
        }
    }, [pageState]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files).filter((file) =>
            file.type.startsWith('image/')
        );

        if (files.length === 0) {
            alert('Please drop only image files');
            return;
        }

        setIsOpen(false);

        for (const file of files) {
            const imageUrl = URL.createObjectURL(file);
            setUploadImage(file);
            setUploadImgSrc(imageUrl);
            setPageState('upload');
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).filter((file) =>
            file.type.startsWith('image/')
        );

        // Close modal immediately
        setIsOpen(false);

        // Process files on main page
        for (const file of files) {
            const imageUrl = URL.createObjectURL(file);
            setUploadImage(file);
            setUploadImgSrc(imageUrl);
            setPageState('upload');
        }
    };

    const handleDownload = async (type: 'csv' | 'image') => {
        const urlToFetch = type === 'csv' ? csvDataLink : resultImageLink;
        if (!urlToFetch) return;

        console.log('Downloading:', urlToFetch);

        try {
            const res = await fetch(`http://10.184.24.43:8000/${urlToFetch}`);
            if (!res.ok) throw new Error('Failed to download file');

            const blob = await res.blob();
            const dlUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = dlUrl;
            a.download = type === 'csv' ? 'shapes.csv' : 'processed.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(dlUrl);
        } catch (err) {
            console.error('Download error:', err);
            alert('Failed to download file. Please try again.');
        }
    };

    const fetchResult = async () => {
        const formData = new FormData();
        formData.append('file', uploadImage as Blob);

        try {
            const response = await fetch(
                'http://10.184.24.43:8000/detect-shapes',
                {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                    credentials: 'omit',
                }
            );

            // Log headers IMMEDIATELY after fetch resolves
            console.log(
                'Photo URL:',
                response.headers.get('X-Photo-Download-URL')
            );
            console.log('CSV URL:', response.headers.get('X-CSV-Download-URL'));
            console.log('Body used?', response.bodyUsed); // Should be false here

            if (!response.ok) throw new Error('Failed to fetch');

            const imageBlob = await response.blob();
            const objectURL = URL.createObjectURL(imageBlob);

            setResultImageURL(objectURL);
            setResultImageLink(response.headers.get('X-Photo-Download-URL'));
            setCsvDataLink(response.headers.get('X-CSV-Download-URL'));
            setPageState('result');
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to process image.');
            setPageState('land');
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsDragOver(false);
    };

    return (
        <div className="flex flex-row h-screen">
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-300">
                            <h2 className="text-2xl font-roboto font-semibold text-gray-800">
                                Upload Files
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Upload Area */}
                        <div className="p-6">
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`
                  border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200
                  ${
                      isDragOver
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                  }
                `}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className={`
                    p-4 rounded-full 
                    ${isDragOver ? 'bg-blue-100' : 'bg-gray-100'}
                  `}
                                    >
                                        <Upload
                                            size={30}
                                            className={
                                                isDragOver
                                                    ? 'text-blue-600'
                                                    : 'text-gray-600'
                                            }
                                        />
                                    </div>

                                    <div>
                                        <p className="text-lg font-roboto font-medium text-black mb-2">
                                            {isDragOver
                                                ? 'Drop your images here'
                                                : 'Drag and drop images here'}
                                        </p>
                                        <p className="text-gray-500 font-roboto mb-4">
                                            or
                                        </p>
                                        <button
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-roboto px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Choose Files
                                        </button>
                                    </div>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-roboto px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="relative w-[40rem] flex flex-col items-center p-10 border border-solid border-gray-500">
                <a
                    href="/landing"
                    className="absolute top-6 left-10 p-2.5 hover:bg-slate-200 rounded-full transition-colors duration-200"
                >
                    <Home size={24} className="" />
                </a>
                <div className=" flex flex-col items-center gap-3">
                    <h1 className="text-3xl font-roboto font-extrabold">
                        VisionCheck
                    </h1>
                    <h3 className="text-lg font-roboto font-light ">
                        Upload your file and get instant measurements
                    </h3>
                </div>
                <div className="flex-1 flex flex-row items-center justify-center gap-4">
                    {pageState === 'land' && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex flex-row items-center gap-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            <Upload size={24} />
                            <p className="text-xl font-bold text-white">
                                Upload Image
                            </p>
                        </button>
                    )}
                    {pageState === 'result' && csvDataLink && (
                        <button
                            onClick={async () => await handleDownload('csv')}
                            className="flex flex-row items-center gap-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        >
                            <DownloadIcon size={24} />
                            <p className="text-xl font-bold text-white">
                                Download CSV
                            </p>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center">
                {pageState === 'land' && (
                    <h1 className="text-white font-serif text-3xl">
                        Upload / Result Image will appear here
                    </h1>
                )}
                {pageState === 'upload' && uploadImage && uploadImgSrc && (
                    <div className="flex-1 w-full flex flex-col items-center justify-center">
                        <div>
                            {/* <img
                                src={uploadImgSrc || ''}
                                alt="Uploaded content"
                                className="max-w-3xl max-h-3xl aspect-auto rounded-xl shadow-lg"
                            /> */}
                            <img
                                src={uploadImgSrc || ''}
                                alt="Uploaded content"
                                // className="max-w-3xl max-h-3xl aspect-auto rounded-xl shadow-lg object-contain"
                                style={{
                                    maxWidth:
                                        '48rem' /* equivalent to max-w-3xl */,
                                    maxHeight:
                                        '42rem' /* equivalent to max-h-3xl */,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius:
                                        '0.75rem' /* equivalent to rounded-xl */,
                                    boxShadow:
                                        '0 10px 15px -3px rgba(0, 0, 0, 0.1)' /* equivalent to shadow-lg */,
                                }}
                            />
                        </div>
                        <button
                            onClick={fetchResult}
                            className="mt-10 px-4 py-2 flex flex-row items-center gap-6 bg-white text-black font-medium font-roboto text-xl rounded-lg hover:bg-slate-100 transition-colors duration-300"
                        >
                            <DraftingCompass
                                size={24}
                                className="inline-block"
                            />
                            <h1>Process Image</h1>
                        </button>
                    </div>
                )}
                {pageState === 'result' &&
                    resultImageLink &&
                    resultImageURL &&
                    csvDataLink && (
                        <div className="flex-1 w-full flex flex-col items-center justify-center">
                            <div>
                                {/* <img
                                src={uploadImgSrc || ''}
                                alt="Uploaded content"
                                className="max-w-3xl max-h-3xl aspect-auto rounded-xl shadow-lg"
                            /> */}
                                <img
                                    src={resultImageURL || ''}
                                    alt="Result content"
                                    // className="max-w-3xl max-h-3xl aspect-auto rounded-xl shadow-lg object-contain"
                                    style={{
                                        maxWidth:
                                            '48rem' /* equivalent to max-w-3xl */,
                                        maxHeight:
                                            '42rem' /* equivalent to max-h-3xl */,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius:
                                            '0.75rem' /* equivalent to rounded-xl */,
                                        boxShadow:
                                            '0 10px 15px -3px rgba(0, 0, 0, 0.1)' /* equivalent to shadow-lg */,
                                    }}
                                />
                            </div>
                            <button
                                onClick={async () =>
                                    await handleDownload('image')
                                }
                                className="mt-10 px-4 py-2 flex flex-row items-center gap-6 bg-white text-black font-medium font-roboto text-xl rounded-lg hover:bg-slate-100 transition-colors duration-300"
                            >
                                <DownloadIcon
                                    size={24}
                                    className="inline-block"
                                />
                                <h1>Download Image</h1>
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}
