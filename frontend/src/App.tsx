import { Routes, Route } from 'react-router-dom';
import NewChat from './pages/new';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Snag from './pages/snag';
import Analytics from './pages/analytics';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/new" element={<NewChat />} />
			<Route path="/snag/:snagId" element={<Snag />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/analytics" element={<Analytics/>}/>
        </Routes>
    );
}

export default App;
