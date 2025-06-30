import { Routes, Route } from "react-router-dom"
import Snag from "./pages/snag"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/snag" element={<Snag />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
