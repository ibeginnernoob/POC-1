import { useState, useEffect } from 'react';
import axios from 'axios';
import type { SnagDetails } from '@/types/snag';

type ResBody = {
    msg: string;
    snagDetails?: SnagDetails;
};

const useFetchAnalysis = (snagId: string | undefined) => {
    const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    const [analysis, setAnalysis] = useState<SnagDetails | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                setIsLoading(true);				
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/snag/fetch/${snagId}`,
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );

                const resData = res.data as ResBody;

                if (res.status !== 200 || !resData.snagDetails) {
                    throw new Error(resData.msg);
                }

                setAnalysis(resData.snagDetails);
            } catch (e: any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        if (snagId && snagId.length > 0) {
            fetchData();
        }
    }, [snagId]);

    return {
        setAnalysis,
        isLoading,
    };
};

export default useFetchAnalysis;
