
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';
import EventDetailPage from '../components/pages/EventDetailPage';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events/:eventId" element={<EventDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
