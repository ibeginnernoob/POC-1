import { X, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

const formatFileSize = (bytes: number | undefined) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

export default function UploadFileModal({
    selectedFile,
    handleUploadFile,
    handleUploadClose,
    isUploading,
}: {
    selectedFile: File;
    handleUploadFile: () => void;
    handleUploadClose: () => void;
    isUploading: boolean;
}) {
    return (
        <div className="bg-white">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        File Preview & Confirmation
                    </h3>
                    <button
                        onClick={handleUploadClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    <div className="space-y-4">
                        {/* File Icon and Name */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <FileSpreadsheet
                                    size={48}
                                    className="text-green-600"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-800 truncate">
                                    {selectedFile?.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Excel Spreadsheet
                                </p>
                            </div>
                        </div>

                        {/* File Details */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    File Size:
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {formatFileSize(selectedFile?.size) || 0}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                    Last Modified:
                                </span>
                                <span className="text-gray-800 font-medium">
                                    {formatDate(
                                        new Date(
                                            selectedFile?.lastModified ||
                                                Date.now()
                                        )
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Type:</span>
                                <span className="text-gray-800 font-medium">
                                    {selectedFile?.type ||
                                        'application/vnd.ms-excel'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <AlertCircle
                                    size={20}
                                    className="text-blue-600 mt-0.5"
                                />
                                <div>
                                    <h5 className="text-sm font-medium text-blue-800">
                                        Are you sure you want to upload this
                                        file?
                                    </h5>
                                    <p className="text-sm text-blue-700 mt-1">
                                        This file will be sent to our external
                                        processing service for analysis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={handleUploadClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUploadFile}
                        // disabled={uploading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                        <>
                            <Upload size={16} />
                            <span>Yes, Upload File</span>
                        </>
                    </button>
                </div>
            </div>
        </div>
    );
}
