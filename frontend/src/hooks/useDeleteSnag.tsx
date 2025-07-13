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
    try {
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/snag/delete-snag/${id}`);
        setLoading(false);
        return { success: true, deletedId: res.data.deletedId };
    } catch (err) {
        setError((err as { response?: { data?: DeleteSnagError } })?.response?.data?.msg || "Unknown error");
        setLoading(false);
        return { success: false };
    }
};

  return { deleteSnag, loading, error };
};
