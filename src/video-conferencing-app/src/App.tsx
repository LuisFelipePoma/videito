import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MediasoupProvider } from './context/MediasoupContext';
import { RoomProvider } from './context/RoomContext';
import Home from './pages/Home';
import RoomPage from './pages/RoomPage';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <MediasoupProvider>
      <RoomProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room/:roomId" element={<RoomPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </RoomProvider>
    </MediasoupProvider>
  );
};

export default App;