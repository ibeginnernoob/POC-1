import React from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/lovable/select';
import { Badge } from '@/components/lovable/badge';

interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: Date;
}

interface FileSelectorProps {
    files: UploadedFile[];
    selectedFile: string | null;
    onFileSelect: (fileId: string | null) => void;
    placeholder?: string;
}

const FileSelector: React.FC<FileSelectorProps> = ({
    files,
    selectedFile,
    onFileSelect,
    placeholder = 'Select a file to query...',
}) => {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileTypeColor = (type: string) => {
        if (type.includes('pdf')) return 'bg-red-100 text-red-800';
        if (type.includes('image')) return 'bg-blue-100 text-blue-800';
        if (type.includes('text') || type.includes('document'))
            return 'bg-green-100 text-green-800';
        return 'bg-gray-100 text-gray-800';
    };

    const getFileTypeLabel = (type: string) => {
        if (type.includes('pdf')) return 'PDF';
        if (type.includes('image')) return 'Image';
        if (type.includes('text')) return 'Text';
        if (type.includes('document')) return 'Doc';
        return 'File';
    };

    return (
        <div className="w-full bg-white">
            <Select
                value={selectedFile || ''}
                onValueChange={(value) => onFileSelect(value)}				
            >
                <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <SelectValue placeholder={placeholder} />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="this is a file">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">
                                No file selected
                            </span>
                        </div>
                    </SelectItem>
                    {files.map((file) => (
                        <SelectItem key={file.id} value={file.id}>
                            <div className="flex items-center justify-between w-full gap-3">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <FileText className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate font-medium">
                                        {file.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Badge
                                        className={`text-xs px-2 py-0 ${getFileTypeColor(
                                            file.type
                                        )}`}
                                    >
                                        {getFileTypeLabel(file.type)}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </span>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                    {files.length === 0 && (
                        <SelectItem value="no-files" disabled>
                            <div className="flex items-center gap-2 text-gray-400">
                                <FileText className="h-4 w-4" />
                                <span>No files uploaded</span>
                            </div>
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FileSelector;
