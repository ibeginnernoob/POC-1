import { Routes, Route } from 'react-router-dom';
import Snag from './pages/snag';
import Login from './pages/login.tsx';
import Signup from './pages/signup';
import NotFound from './pages/notFound';
import Landing from './pages/landing';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/snag" element={<Snag />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
