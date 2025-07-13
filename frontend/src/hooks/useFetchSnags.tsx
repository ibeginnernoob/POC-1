import { useState, useEffect } from 'react';
import axios from 'axios';
import type { SnagDetails } from '@/types/snag';

type ResBody = {
  msg: string;
  snags?: SnagDetails[];
};

const useFetchAllSnags = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [snags, setSnags] = useState<SnagDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnags = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No auth token found.');
        }

        const res = await axios.get<ResBody>(`${import.meta.env.VITE_BACKEND_URL}/snag/fetch-sidebar`, {
          headers: {
            Authorization: token,
          },
        });

        if (res.status !== 200 || !res.data.snags) {
          throw new Error(res.data.msg || 'Unexpected error');
        }

        setSnags(res.data.snags);
      } catch (err: any) {
        console.error('Failed to fetch snags:', err.message);
        setError(err.message || 'Something went wrong');
        setSnags([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSnags();
  }, []);

  return {
    snags,
    isLoading,
    error,
  };
};

export default useFetchAllSnags;

