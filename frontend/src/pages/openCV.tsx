import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Upload,
    Download,
    Camera,
    File,
    X,
    Home,
    DraftingCompass,
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

    // const handleImageUpload = (event: any) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setuploadImagege(file);
    //         setPageState('upload');
    //     }
    // };

    // const processFile = useCallback(async (file) => {
    //     // Simulate file processing
    //     setIsProcessing(true);

    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const processedFile = {
    //                 id: Date.now() + Math.random(),
    //                 name: file.name,
    //                 size: file.size,
    //                 type: file.type,
    //                 url: URL.createObjectURL(file),
    //                 uploadedAt: new Date(),
    //                 status: 'completed',
    //             };
    //             resolve(processedFile);
    //             setIsProcessing(false);
    //         }, 1500);
    //     });
    // }, []);

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
        if (type === 'csv' && !csvDataLink) return; // Prevent action if URL isn't set
        if (type === 'image' && !resultImageLink) return;

        try {
            const response = await fetch(
                `http://192.168.2.4:8000/${
                    type === 'csv' ? csvDataLink : resultImageLink
                }`
            );
            if (!response.ok) {
                throw new Error('Failed to download file');
            }

            const fileBlob = await response.blob(); // Get as blob

            // Create a temporary URL for the blob
            const downloadUrl = URL.createObjectURL(fileBlob);

            // Create a hidden anchor element to trigger download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'shapes.csv'; // Set the filename (customize as needed)
            document.body.appendChild(link);
            link.click(); // Simulate click to download

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
        } catch (err) {
            console.error('Download error:', err);
            alert('Failed to download file. Please try again.');
        }
    };

    const fetchResult = async () => {
        const formData = new FormData();

        // Append the file with the key name your FastAPI endpoint expects
        formData.append('file', uploadImage as Blob);

        try {
            const response = await fetch(
                'http://192.168.2.4:8000/detect-shapes',
                {
                    method: 'POST',
                    body: formData, // Don't set Content-Type header - let browser set it
                }
            );

            if (!response || !response.ok) {
                throw new Error('Failed to fetch image');
            }

            // Get the image as a blob from the response body
            const imageBlob = await response.blob();

            // Create a temporary URL for the blob
            const url = URL.createObjectURL(imageBlob);

            console.log('Image URL:', url);
            console.log(response);
            console.log(response.headers);
            console.log(response.headers.get('x-photo-download-url'));
            console.log(response.headers.get('x-csv-download-url'));

            // Store the URL in state
            setResultImageURL(url);
            setResultImageLink(
                response.headers.get('x-photo-download-url') || null
            );
            setCsvDataLink(response.headers.get('x-csv-download-url') || null);
            setPageState('result');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to process image. Please try again.');
            setPageState('land');
        }
    };

    // const removeFile = useCallback((fileId) => {
    //     setUploadedFiles((prev) => {
    //         const updatedFiles = prev.filter((file) => file.id !== fileId);
    //         // Clean up object URLs to prevent memory leaks
    //         const fileToRemove = prev.find((file) => file.id === fileId);
    //         if (fileToRemove && fileToRemove.url) {
    //             URL.revokeObjectURL(fileToRemove.url);
    //         }
    //         return updatedFiles;
    //     });
    // }, []);

    // const formatFileSize = (bytes) => {
    //     if (bytes === 0) return '0 Bytes';
    //     const k = 1024;
    //     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    //     const i = Math.floor(Math.log(bytes) / Math.log(k));
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    // };

    const closeModal = () => {
        setIsOpen(false);
        setIsDragOver(false);
    };

    // const processImage = (file) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const img = new Image();
    //         img.onload = () => {
    //             const imageData = {
    //                 id: Date.now(),
    //                 file: file,
    //                 preview: e.target.result,
    //                 name: file.name,
    //                 size: file.size,
    //                 width: img.width,
    //                 height: img.height,
    //                 uploadedAt: new Date().toISOString(),
    //             };

    //             setuploadImagege(imageData);

    //             const csvEntry = {
    //                 filename: file.name,
    //                 width: img.width,
    //                 height: img.height,
    //                 fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    //                 uploadDate: new Date().toLocaleDateString(),
    //                 uploadTime: new Date().toLocaleTimeString(),
    //             };

    //             setCsvData(csvEntry);
    //         };
    //         img.src = e.target.result;
    //     };
    //     reader.readAsDataURL(file);
    // };

    // const handleDrag = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if (e.type === 'dragenter' || e.type === 'dragover') {
    //         setDragActive(true);
    //     } else if (e.type === 'dragleave') {
    //         setDragActive(false);
    //     }
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setDragActive(false);

    //     const files = e.dataTransfer.files;
    //     if (files && files[0]) {
    //         processImage(files[0]);
    //     }
    // };

    // const downloadCSV = () => {
    //     if (!csvData) {
    //         alert('No image data to export!');
    //         return;
    //     }

    //     const headers = [
    //         'Filename',
    //         'Width (px)',
    //         'Height (px)',
    //         'File Size',
    //         'Upload Date',
    //         'Upload Time',
    //     ];
    //     const csvContent = [
    //         headers.join(','),
    //         [
    //             `"${csvData.filename}"`,
    //             csvData.width,
    //             csvData.height,
    //             `"${csvData.fileSize}"`,
    //             `"${csvData.uploadDate}"`,
    //             `"${csvData.uploadTime}"`,
    //         ].join(','),
    //     ].join('\n');

    //     const blob = new Blob([csvContent], {
    //         type: 'text/csv;charset=utf-8;',
    //     });
    //     const link = document.createElement('a');
    //     const url = URL.createObjectURL(blob);
    //     link.setAttribute('href', url);
    //     link.setAttribute(
    //         'download',
    //         `dimensions_${new Date().toISOString().split('T')[0]}.csv`
    //     );
    //     link.style.visibility = 'hidden';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    return (
        // <div className="h-screen flex overflow-hidden">
        //     {/* Left Panel */}
        //     <div className="w-1/2 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        //         {/* Decorative elements */}
        //         <div className="absolute inset-0 overflow-hidden">
        //             <div className="absolute -top-20 -left-20 w-80 h-80 border-2 border-blue-200/30 rounded-full"></div>
        //             <div className="absolute top-40 left-20 w-64 h-64 border border-indigo-200/20 rounded-full"></div>
        //             <div className="absolute -bottom-32 -left-32 w-96 h-96 border border-slate-300/20 rounded-full"></div>
        //             <div className="absolute top-20 right-10 w-32 h-32 border border-blue-300/25 rounded-full"></div>
        //             <div className="absolute bottom-40 right-20 w-48 h-48 border border-indigo-200/30 rounded-full"></div>

        //             {/* Floating gradient orbs */}
        //             <div className="absolute top-32 right-32 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-xl"></div>
        //             <div className="absolute bottom-48 left-24 w-32 h-32 bg-gradient-to-r from-slate-400/10 to-blue-400/10 rounded-full blur-xl"></div>
        //         </div>

        //         <div className="relative z-10 h-full flex flex-col justify-center px-16">
        //             {/* Title */}
        //             <h1 className="text-7xl font-extralight text-slate-800 mb-4 leading-tight">
        //                 Image
        //             </h1>
        //             <h1 className="text-7xl font-extralight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-16 leading-tight">
        //                 Detection
        //             </h1>

        //             {/* Upload Button */}
        //             <div className="mb-24">
        //                 <div
        //                     className={`transition-all duration-300 ${
        //                         dragActive ? 'scale-105' : ''
        //                     }`}
        //                     onDragEnter={handleDrag}
        //                     onDragLeave={handleDrag}
        //                     onDragOver={handleDrag}
        //                     onDrop={handleDrop}
        //                 >
        //                     <label
        //                         htmlFor="image-upload"
        //                         className="cursor-pointer block"
        //                     >
        //                         <div
        //                             className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl text-xl font-semibold transition-all duration-300 inline-block shadow-lg hover:shadow-xl ${
        //                                 dragActive
        //                                     ? 'from-blue-700 to-indigo-700 shadow-2xl scale-105'
        //                                     : ''
        //                             }`}
        //                         >
        //                             Upload Image
        //                         </div>
        //                         <input
        //                             id="image-upload"
        //                             type="file"
        //                             accept="image/*"
        //                             onChange={handleImageUpload}
        //                             className="hidden"
        //                         />
        //                     </label>
        //                 </div>
        //             </div>

        //             {/* Results Section */}
        //             <div>
        //                 <h2 className="text-5xl font-extralight text-slate-600 mb-8 tracking-widest">
        //                     RESULTS
        //                 </h2>

        //                 {csvData ? (
        //                     <button
        //                         onClick={downloadCSV}
        //                         className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 rounded-xl text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center group"
        //                     >
        //                         <Download className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
        //                         dimensions.csv
        //                     </button>
        //                 ) : (
        //                     <div className="opacity-40">
        //                         <div className="bg-slate-300 text-slate-500 px-12 py-4 rounded-xl text-xl font-semibold inline-flex items-center">
        //                             <Download className="w-5 h-5 mr-3" />
        //                             dimensions.csv
        //                         </div>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>
        //     </div>

        //     {/* Right Panel */}
        //     <div className="w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
        //         {/* Background decoration */}
        //         <div className="absolute inset-0 opacity-20">
        //             <div className="absolute top-16 right-16 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-12 blur-3xl"></div>
        //             <div className="absolute bottom-24 left-16 w-56 h-56 bg-gradient-to-r from-slate-400 to-blue-400 rounded-2xl transform -rotate-6 blur-2xl"></div>
        //             <div className="absolute top-1/2 left-8 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl"></div>
        //         </div>

        //         {/* Grid pattern overlay */}
        //         <div
        //             className="absolute inset-0 opacity-5"
        //             style={{
        //                 backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
        //                 backgroundSize: '50px 50px',
        //             }}
        //         ></div>

        //         {/* Content */}
        //         <div className="relative z-10 w-full max-w-md mx-8">
        //             {uploadImagege ? (
        //                 <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        //                     <div className="aspect-square overflow-hidden">
        //                         <img
        //                             src={uploadImagege.preview}
        //                             alt="Uploaded content"
        //                             className="w-full h-full object-cover"
        //                         />
        //                     </div>
        //                     <div className="p-6">
        //                         <h3 className="text-lg font-bold text-slate-800 mb-4 truncate">
        //                             {uploadImagege.name}
        //                         </h3>
        //                         <div className="space-y-3">
        //                             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        //                                 <span className="text-slate-600 font-medium">
        //                                     Dimensions
        //                                 </span>
        //                                 <span className="text-slate-800 font-bold">
        //                                     {uploadImagege.width} ×{' '}
        //                                     {uploadImagege.height}px
        //                                 </span>
        //                             </div>
        //                             <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
        //                                 <span className="text-blue-600 font-medium">
        //                                     File Size
        //                                 </span>
        //                                 <span className="text-blue-800 font-bold">
        //                                     {(
        //                                         uploadImagege.size /
        //                                         1024 /
        //                                         1024
        //                                     ).toFixed(2)}{' '}
        //                                     MB
        //                                 </span>
        //                             </div>
        //                             <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
        //                                 <span className="text-indigo-600 font-medium">
        //                                     Format
        //                                 </span>
        //                                 <span className="text-indigo-800 font-bold">
        //                                     {uploadImagege.name
        //                                         .split('.')
        //                                         .pop()
        //                                         .toUpperCase()}
        //                                 </span>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ) : (
        //                 <div className="text-center text-white">
        //                     <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
        //                         <Camera className="w-16 h-16 text-white/70" />
        //                     </div>
        //                     <h3 className="text-2xl font-light mb-4 text-white/90">
        //                         Ready for Analysis
        //                     </h3>
        //                     <p className="text-white/70 text-lg leading-relaxed">
        //                         Upload an image to view its
        //                         <br />
        //                         <span className="text-blue-300">
        //                             dimensions and details
        //                         </span>
        //                     </p>
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        // </div>
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
                                        '44rem' /* equivalent to max-h-3xl */,
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
                                            '44rem' /* equivalent to max-h-3xl */,
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
            </div>
        </div>
    );
}
