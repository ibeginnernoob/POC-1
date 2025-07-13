import { useState } from 'react';
import axios from 'axios';

export const useFetchAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const analyseSnag = async ({ file_name, pb_number, query }: { file_name: string; pb_number: string; query: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/snag/analyse', {
        file_name,
        pb_number,
        query
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { analyseSnag, data, loading, error };
};
