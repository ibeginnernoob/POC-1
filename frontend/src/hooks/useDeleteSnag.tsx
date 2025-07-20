import axios from "axios";
import { useState } from "react";

export const useDeleteSnag = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface DeleteSnagResponse {
    success: boolean;
    deletedId?: string;
  }

  interface DeleteSnagError {
    msg: string;
  }

  const deleteSnag = async (id: string): Promise<DeleteSnagResponse> => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Get token from wherever you store it (localStorage, context, etc.)
      const token = localStorage.getItem("token"); // Adjust based on your auth setup

      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/snag/delete-snag/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      );
      return { success: true, deletedId: res.data.deletedId };
    } catch (err) {
      const errorMessage =
        (err as { response?: { data?: DeleteSnagError } })?.response?.data
          ?.msg || "Unknown error";
      setError(errorMessage);
      return { success: false };
    } finally {
      setLoading(false); // Ensure loading is always set to false
    }
  };

  return { deleteSnag, loading, error };
};
