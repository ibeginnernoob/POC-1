import { useState, useEffect } from 'react';
import axios from 'axios';

const useFiles = (isAuth: boolean) => {
    const [optionFiles, setOptionFiles] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token') || '';

                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/snag/user-files`,
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );

                if (res.status !== 200) {
                    throw new Error('Failed to fetch files');
                }

                console.log('Fetched files:', res.data.files);

                if (res.data && Array.isArray(res.data.files)) {
                    setOptionFiles(res.data.files);
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuth) {
            fetchFiles();
        }
    }, [isAuth]);

    return {
        optionFiles,
        isLoading,
    };
};

export default useFiles;
