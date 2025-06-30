import { useState } from 'react';
import { Modal, Box, type SxProps, type Theme } from '@mui/material';
import Header from '@/components/snag/header';
import Chat from '@/components/snag/chat';
import Input from '@/components/snag/input';
import DetailsDialog from '@/components/snag/detailsDialog';
import Fade from '@mui/material/Fade';
import Sidebar from '@/components/snag/sidebar';
import Loader from '@/components/ui/loader';
import axios from 'axios';

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

type PrevSnag = {
    rank: string;
    content: string;
    metadata: {
        helicopter: string;
        category: string;
        snag_data: string;
        rectified_on: string;
    };
    similarity_score: string;
    similarity_percentage: string;
};

export type GeneratedData = {
    timestamp: string;
    query: string;
    status: string;
    rectification: {
        ai_recommendation: string;
        confidence: string;
        based_on_historical_case: string;
    };
    similar_historical_snags: PrevSnag[];
    summary: {
        total_similar_cases_found: string;
        average_similarity_percentage: string;
        highest_similarity_percentage: string;
        lowest_similarity_percentage: string;
        recommendation_reliability: string;
    };
};

type Response = {
    generatedData: GeneratedData;
    msg: string;
};

// initially -> response = null, isGeneratedSuccess = false, isError = false
// if generation successful -> response = req responseBody, isGeneratedSuccess = true, isError = false
// if generation not successful -> response = null, isGeneratedSuccess = false, isError = true

export default function Snag() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const [inputValues, setInputValues] = useState<InputDetails>({
        prompt: '',
        type: null,
        event: null,
        raised_by: null,
        hours: [0, 2000],
        checked: false,
    });
    const [response, setResponse] = useState<GeneratedData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGenerationSuccess, setIsGenerationSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    console.log(response);

    const fetchDetails = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post('http://localhost:3000/snag/rectify', {
                query: inputValues.prompt,
                helicopter_type: inputValues.type,
                event_type: inputValues.event,
                flight_hours: {
                    lower: inputValues.hours[0],
                    upper: inputValues.hours[1],
                },
                raised_by: inputValues.raised_by,
            });
            if (!res.data) {
                setResponse(null);
            }
            const resBody = res.data as Response;
            setResponse(resBody.generatedData);
            setIsGenerationSuccess(true);
            setIsLoading(false);
        } catch (e: any) {
            console.log(e);
            setIsError(true);
            setIsLoading(false);
        }
    };

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
            <div className={`w-[100%] overflow-y-auto ${!isGenerationSuccess ? "h-[80vh]" : "h-[100vh]"}`}>
                <Header handleSidebarOpen={handleSidebarOpen} />
                <Chat
                    response={response}
                    isGenerationSuccess={isGenerationSuccess}
                    isError={isError}
                />
            </div>
            {!isGenerationSuccess && (
                <Input
                    handleModalOpen={handleDialogOpen}
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    setResponse={setResponse}
                    fetchDetails={fetchDetails}
                />
            )}
        </div>
    );
}
