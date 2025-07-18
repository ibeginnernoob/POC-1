import { useEffect, useState, useRef } from 'react';
import { Modal, Box, type SxProps, type Theme } from '@mui/material';
import Header from '@/components/snag/header';
import Chat from '@/components/snag/chat';
import Input from '@/components/snag/input';
import DetailsDialog from '@/components/snag/detailsDialog';
import Fade from '@mui/material/Fade';
import Sidebar from '@/components/snag/sidebar';
import Loader from '@/components/ui/loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useIsAuth from '@/hooks/useIsAuth';
import UploadFileModal from '@/components/snag/uploadFileModal';
import useFiles from '@/hooks/useFiles';

type Response = {
    snagId?: string;
    msg: string;
};

export default function NewChat() {
    const navigate = useNavigate();
    const { isAuth, isLoading: isLoadingAuthStatus } = useIsAuth();
    const { optionFiles, isLoading: isLoadingOptionFiles } = useFiles(isAuth);
    const fileUpload = useRef<any>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<string[]>(['default']);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    const [dialogValues, setDialogValues] = useState<any>({});
    const [query, setQuery] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuth && !isLoadingAuthStatus) {
            navigate('/login');
        }
    }, [isAuth, isLoadingAuthStatus]);

    const handleSetQuery = (value: string) => {
        setQuery(value);
    };

    // details dialog
    const handleDetailsDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDetailsDialogClose = () => {
        setDialogOpen(false);
    };

    // sidebar
    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };
    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    // file uploader
    const handleUploadClose = () => {
        if (isUploading) {
            return;
        }
        setUploadOpen(false);
        setUploadFile(null);
        fileUpload.current.value = null;
    };

    const handleUploadFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        setUploadFile(e.target.files[0]);
        setUploadOpen(true);
    };

    const handleFileUpload = async () => {
        if (!uploadFile) {
			console.error('No file selected for upload');
            return;
        }
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', uploadFile);

            const token = localStorage.getItem('token');
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/snag/upload-file`,
                formData,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            if (res.status !== 200) {
                throw new Error(res.data.msg);
            }

            navigate(0);
            handleUploadClose();
            alert('File uploaded successful');
        } catch (e: any) {
            console.error(e);
            alert(
                `Error uploading file: ${
                    e.msg || e.message || 'Could not identify error'
                }`
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileOptionSelect = (e: {
        value: string[];
        label: string[];
    }) => {
        setSelectedFiles([e.value[0]]);
        setDialogValues({});
    };

    const fetchDetails = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');

            if (selectedFiles.length === 0 || query.length === 0) {
                if (selectedFiles.length) {
                    alert('Please select a file');
                }
                if (query.length === 0) {
                    alert('Please enter your query/snag');
                }

                return;
            }

            const properties = Object.entries(dialogValues)
                .filter(([_, value]) => value !== null && value !== undefined)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ');

            let prompt = `snag: ${query} \n ${properties}`;

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/snag/rectify`,
                {
                    filename: selectedFiles[0],
                    prompt: prompt,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            const resBody = res.data as Response;
            if (res.status !== 200) {
                throw new Error(resBody.msg);
            }

            navigate(`/snag/${resBody.snagId}`);
            setDialogValues({});
        } catch (e: any) {
            console.log(e);
            alert(e.message || e.msg || 'Some error occured');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <Modal
                open={isLoading || isLoadingAuthStatus || isLoadingOptionFiles}
                onClose={() => setIsLoading(false)}
                disableEscapeKeyDown={true}
            >
                <Loader />
            </Modal>
            <Modal open={dialogOpen} onClose={handleDetailsDialogClose}>
                <Box sx={style}>
                    <DetailsDialog
                        dialogValues={dialogValues}
                        setDialogValues={setDialogValues}
                        handleClose={handleDetailsDialogClose}
                        selectedFile={selectedFiles[0]}
                    />
                </Box>
            </Modal>
            <Modal open={sidebarOpen} onClose={handleSidebarClose}>
                <Fade in={sidebarOpen}>
                    <Box sx={sidebarStyles}>
                        <Sidebar setSideBarOpen={setSidebarOpen} />
                    </Box>
                </Fade>
            </Modal>
            <Modal
                open={uploadOpen}
                onClose={handleUploadClose}
                disableEscapeKeyDown={true}
            >
                <Fade in={uploadOpen}>
                    <Box sx={style}>
                        <UploadFileModal
                            selectedFile={uploadFile!}
                            handleUploadClose={handleUploadClose}
                            handleUploadFile={handleFileUpload}
                            isUploading={isUploading}
                        />
                    </Box>
                </Fade>
            </Modal>
            <Header
                handleSidebarOpen={handleSidebarOpen}
                handleFileSelect={handleUploadFileSelect}
                fileUploadRef={fileUpload}
                isNew={true}
            />
            <div className="flex-1 overflow-y-auto">
                <Chat isNew={true} />
            </div>
            <div className="flex-shrink-0">
                <Input
                    handleModalOpen={handleDetailsDialogOpen}
                    query={query}
                    handleSetQuery={handleSetQuery}
                    fetchDetails={fetchDetails}
                    files={optionFiles}
                    selectedFile={selectedFiles}
                    handleSelectFile={handleFileOptionSelect}
                />
            </div>
        </div>
    );
}

const style: SxProps<Theme> | undefined = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 10,
    borderRadius: 8,
};

const sidebarStyles: SxProps<Theme> | undefined = {
    position: 'absolute',
    left: 0,
    bgcolor: 'background.paper',
    boxShadow: 10,
};
