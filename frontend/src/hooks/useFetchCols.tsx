import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCols = (filename: string) => {
    const [cols, setCols] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!filename || filename.length === 0) {
                    return;
                }

                setIsLoading(true);

                if (filename === 'default') {
                    setCols({});
                    return;
                }

                const token: string = localStorage.getItem('token') || '';

                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/snag/fetch-cols`,
                    {
                        filename: filename,
                    },
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );

                setCols(res.data.columns);
            } catch (e: any) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [filename]);

    return {
        cols,
        isLoading,
    };
};

export default useFetchCols;
