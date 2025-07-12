import { Routes, Route } from "react-router-dom";
import NewChat from "./pages/new";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Snag from "./pages/snag";
import Analytics from "./pages/analytics";
import Test from "./pages/test";
import '@/index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/new" element={<NewChat />} />
      <Route path="/snag/:snagId" element={<Snag />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/analytics" element={<Analytics />} />
	  <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
