import { Routes, Route } from 'react-router-dom';
import NewChat from './pages/new';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Snag from './pages/snag';
import OpenCV from './pages/openCV';
import DocsPage from './pages/docs';
import '@/index.css';

function App() {
    return (
        <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/snag/new" element={<NewChat />} />
            <Route path="/snag/:snagId" element={<Snag />} />
            <Route path="/opencv" element={<OpenCV />} />
            <Route path="/" element={<LoginPage />} />
			<Route path="/docs" element={<DocsPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/test" element={<Test />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
