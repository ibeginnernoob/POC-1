import { useEffect, useState } from 'react';
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
import { Upload } from 'lucide-react';
import { set } from 'date-fns';

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

export type InputDetails = {
    prompt: string;
    type: string | null;
    event: string | null;
    raised_by: string | null;
    hours: number[];
    checked: boolean;
};

type Response = {
    snagId?: string;
    msg: string;
};

export default function NewChat() {
    const navigate = useNavigate();
    const { isAuth, isLoading: isLoadingIsAuth } = useIsAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };
    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };
    const handleUploadClose = () => {
        setUploadOpen(false);
    };

    useEffect(() => {
        if (!isAuth && !isLoadingIsAuth) {
            navigate('/login');
        }
    }, [isAuth]);

    const [inputValues, setInputValues] = useState<InputDetails>({
        prompt: '',
        type: null,
        event: null,
        raised_by: null,
        hours: [0, 2000],
        checked: false,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const fetchDetails = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:3000/snag/rectify',
                {
                    query: inputValues.prompt,
                    helicopter_type: inputValues.type,
                    event_type: inputValues.event,
                    isChecked: inputValues.checked,
                    flight_hours: {
                        lower: inputValues.hours[0],
                        upper: inputValues.hours[1],
                    },
                    raised_by: inputValues.raised_by,
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

            setInputValues({
                prompt: '',
                type: null,
                event: null,
                raised_by: null,
                hours: [0, 2000],
                checked: false,
            });
        } catch (e: any) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        setFile(e.target.files[0]);
        setUploadOpen(true);
    };

    // const handleFileUpload = async () => {
    //     if (!file) {
    //         alert('Please select a file to upload');
    //         return;
    //     }

    //     const token = localStorage.getItem('token');

    //     const data = new FormData();
    //     data.append('excel', file);
    //     data.append('filename', file.name);

    //     try {
    //         const res = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: data,
    //             headers: {
    //                 authotization: token || '',
    //             },
    //         });

    //         if (!res.ok) throw new Error(await res.text());
    //         alert('Uploaded!');
    //     } catch (err) {
    //         console.error(err);
    //         alert('Upload failed');
    //     }
    // };

    return (
        <div className="h-screen flex flex-col relative">
            <Modal open={isLoading} onClose={() => setIsLoading(false)}>
                <Loader />
            </Modal>
            <Modal open={dialogOpen} onClose={handleDialogClose}>
                <Box sx={style}>
                    <DetailsDialog
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                        handleClose={handleDialogClose}
                    />
                </Box>
            </Modal>
            <Modal open={sidebarOpen} onClose={handleSidebarClose}>
                <Fade in={sidebarOpen}>
                    <Box sx={sidebarStyles}>
                        <Sidebar />
                    </Box>
                </Fade>
            </Modal>
            <Modal open={uploadOpen} onClose={handleUploadClose}>
                <Fade in={true}>
                    <Box sx={style}>
                        <UploadFileModal selectedFile={file!} />
                    </Box>
                </Fade>
            </Modal>
            <div className={`w-[100%] overflow-y-auto h-[80vh]`}>
                <Header
                    handleSidebarOpen={handleSidebarOpen}
                    handleFileSelect={handleFileSelect}
                />
                {/* <Chat
                    response={response}
                    isGenerationSuccess={isGenerationSuccess}
                    isError={isError}
                /> */}
            </div>
            <Input
                handleModalOpen={handleDialogOpen}
                inputValues={inputValues}
                setInputValues={setInputValues}
                fetchDetails={fetchDetails}
            />
        </div>
    );
}
