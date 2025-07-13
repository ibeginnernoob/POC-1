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
import SimilarSnagsList from '@/components/snag/SimilarSnagsList.tsx';
import AnalyticsModal from '@/components/snag/analyticsModal';
import axios from 'axios';

export default function Snag() {
    const { snagId } = useParams();

    const navigate = useNavigate();
    const { isAuth, isLoading: isLoadingIsAuth } = useIsAuth();

    const [snagFetchRunner, setSnagFetchRunner] = useState<number>(0);
    const { snagDetails, isLoading } = useFetch(snagId, snagFetchRunner);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

    const [openHistSnags, setOpenHistSnags] = useState(false);
    const [openAnalytics, setOpenAnalytics] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const similar_historical_snags =
        snagDetails?.similar_historical_snags || [];

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

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                setIsLoadingAnalysis(true);
                const token = localStorage.getItem('token');
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/snag/analyse`,
                    {
                        file_name: snagDetails?.filename || '',
                        snagId: snagDetails?._id || '',
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (!res || res.status !== 200) {
                    throw new Error('Failed to fetch analysis');
                }

                setSnagFetchRunner((prev) => prev + 1);
            } catch (e: any) {
                console.log(e);
                setOpenAnalytics(false);
            } finally {
                setIsLoadingAnalysis(false);
            }
        };

        if (!snagDetails?.isAnalysisFetch && openAnalytics) {
            fetchAnalysis();
        }
    }, [openAnalytics]);

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
                        <Sidebar setSideBarOpen={setSidebarOpen} />
                    </Box>
                </Fade>
            </Modal>
            <Modal open={openAnalytics} onClose={() => setOpenAnalytics(false)}>
                <Fade in={openAnalytics}>
                    <Box sx={analyticsStyles}>
                        <AnalyticsModal isLoading={isLoadingAnalysis} />
                    </Box>
                </Fade>
            </Modal>
            <div className={`w-[100%] overflow-y-auto h-[100vh]`}>
                <Header
                    handleSidebarOpen={handleSidebarOpen}
                    isNew={false}
                    setOpenHistSnags={setOpenHistSnags}
                    setOpenAnalytics={setOpenAnalytics}
                />
                <Chat isNew={false} snagDetails={snagDetails} />
                <SimilarSnagsList
                    open={openHistSnags}
                    setOpen={setOpenHistSnags}
                    data={similar_historical_snags || []}
                />
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

const analyticsStyles: SxProps<Theme> | undefined = {
    position: 'absolute',
    right: 0,
    bgcolor: 'background.paper',
    boxShadow: 10,
};
