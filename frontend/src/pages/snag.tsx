import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useIsAuth from "@/hooks/useIsAuth";
import { Modal, Box, type SxProps, type Theme } from "@mui/material";
import Header from "@/components/snag/header";
import Chat from "@/components/snag/chat";
import Fade from "@mui/material/Fade";
import Sidebar from "@/components/snag/sidebar";
import Loader from "@/components/ui/loader";
import { useNavigate } from "react-router";
import useFetch from "@/hooks/useFetch";

const sidebarStyles: SxProps<Theme> | undefined = {
  position: "absolute",
  left: 0,
  bgcolor: "background.paper",
  boxShadow: 10,
};

type PrevSnag = {
  rank: string;
  content: string;
  metadata: {
    helicopter: string;
    raised_by: string;
    event: string;
    snag_date: string;
    rectified_on: string;
  };
  similarity_score: string;
  similarity_percentage: string;
};

export type GeneratedData = {
  timestamp: string;
  query: string;
  status: string;
  rectification: {
    ai_recommendation: string;
    based_on_historical_cases: string;
  };
  similar_historical_snags: PrevSnag[];
  summary: {
    total_similar_cases_found: string;
    average_similarity_percentage: string;
    highest_similarity_percentage: string;
    lowest_similarity_percentage: string;
  };
};

export default function Snag() {
  const { snagId } = useParams();

  const navigate = useNavigate();
  const { isAuth, isLoading: isLoadingIsAuth } = useIsAuth();
  const { snagDetails, isLoading } = useFetch(snagId);
  console.log(snagDetails);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (!isAuth && !isLoadingIsAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className="h-screen flex flex-col relative">
      <Modal open={isLoading}>
        <Loader />
      </Modal>
      <Modal open={sidebarOpen} onClose={handleSidebarClose}>
        <Fade in={sidebarOpen}>
          <Box sx={sidebarStyles}>
            <Sidebar />
          </Box>
        </Fade>
      </Modal>
      <div className={`w-[100%] overflow-y-auto h-[100vh]`}>
        <Header
          handleSidebarOpen={handleSidebarOpen}
          // handleFileUpload={handleFileUpload}
        />
        <Chat isNew={false} snagDetails={snagDetails} />
      </div>
    </div>
  );
}
