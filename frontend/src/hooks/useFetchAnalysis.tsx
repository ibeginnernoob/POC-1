import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchAnalysis = (snagId: string, filename: string) => {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/analysis`,
          {
            file_name: filename,
            snagId: snagId,
          },
          {
            headers: {
              Authorization: token || "",
            },
          },
        );
        setAnalysisData(response.data);
      } catch (err: any) {
        setError(
          err.msg ||
            err.message ||
            "An error occurred while fetching analysis data",
        );
      } finally {
        setLoading(false);
      }
    };

    if (analysisData === null) {
      fetchAnalysis();
    }
  }, [analysisData, loading, error]);

  return { analysisData, loading, error };
};
