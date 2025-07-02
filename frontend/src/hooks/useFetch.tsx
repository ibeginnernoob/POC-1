import { useState, useEffect } from 'react';
import axios from 'axios';
import type { GeneratedData } from '@/pages/snag';

export type SnagQueryData = {
    query: string;
    helicopter_type: string;
    event_type: string;
    raised_by: string;
    isChecked: boolean;
    flightHours: {
        lower: string;
        upper: string;
    };
};

export type SnagDetails = {
    _id: string;
    title: string;
    details: SnagQueryData;
    generated: GeneratedData;
};

type ResBody = {
    msg: string;
    snagDetails?: SnagDetails;
};

const useFetch = (snagId: string | undefined) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [snagDetails, setSnagDetails] = useState<SnagDetails | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                setIsLoading(true);

                const res = await axios.get(
                    `http://localhost:3000/snag/fetch/${snagId}`,
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

                setSnagDetails(resData.snagDetails);
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
        snagDetails,
        isLoading,
    };
};

export default useFetch;
