import { useState, useEffect } from 'react';
import axios from 'axios';

const useFiles = () => {
    const [files, setFiles] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('token') || '';

                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/files`,
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );

                if (res.status !== 200) {
                    throw new Error('Failed to fetch files');
                }

                if (res.data && Array.isArray(res.data.files)) {
                    setFiles(res.data.files);
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, []);

	return {
		files,
		isLoading,
	}
};

export default useFiles;