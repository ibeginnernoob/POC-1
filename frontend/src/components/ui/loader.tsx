import { Spinner } from '@chakra-ui/react';
import { CircularProgress, Box } from '@mui/material';

export default function Loader() {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">            
            <Box sx={{ display: 'flex' }}>
                <CircularProgress size={60} color='secondary' />
            </Box>
        </div>
    );
}
