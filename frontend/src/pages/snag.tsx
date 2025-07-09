import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useIsAuth from '@/hooks/useIsAuth';
import { Modal, Box, type SxProps, type Theme } from '@mui/material';
import Header from '@/components/snag/header';
import Chat from '@/components/snag/chat';
import Fade from '@mui/material/Fade';
import Sidebar from '@/components/snag/sidebar';
import Loader from '@/components/ui/loader';
import { useNavigate } from 'react-router';
import useFetch from '@/hooks/useFetch';

export default function Snag() {
    const { snagId } = useParams();

    const navigate = useNavigate();
    const { isAuth, isLoading: isLoadingIsAuth } = useIsAuth();
    const { snagDetails, isLoading } = useFetch(snagId);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };
    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        if (!isAuth && !isLoadingIsAuth) {
            navigate('/login');
        }
    }, [isAuth]);

    if (isLoading || isLoadingIsAuth) {
        return (
            <div className="h-screen w-screen flex justify-center items-center bg-white">
                <Loader />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col relative">
            <Modal open={isLoading}>
                <Loader />
            </Modal>
            <Modal open={sidebarOpen} onClose={handleSidebarClose}>
                <Fade in={sidebarOpen}>
                    <Box sx={sidebarStyles}>
                        <Sidebar />
                    </Box>
                </Fade>
            </Modal>
            <div className={`w-[100%] overflow-y-auto h-[100vh]`}>
                <Header handleSidebarOpen={handleSidebarOpen} isNew={false} />
                <Chat snagDetails={snagDetails} isNew={false} />
            </div>
        </div>
    );
}

const sidebarStyles: SxProps<Theme> | undefined = {
    position: 'absolute',
    left: 0,
    bgcolor: 'background.paper',
    boxShadow: 10,
};
