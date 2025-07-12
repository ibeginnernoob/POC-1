import { Routes, Route } from "react-router-dom";
import NewChat from "./pages/new";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/notFound";
import Landing from "./pages/landing";
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/analytics" element={<Analytics />} />
	  <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
