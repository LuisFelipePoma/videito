import React from 'react';
import { useSocket } from '../hooks/useSocket';
import { Layout } from '../components/layout/Layout';

const Home: React.FC = () => {
  const { connect } = useSocket();

  React.useEffect(() => {
    connect();
  }, [connect]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Video Conferencing App</h1>
        <p className="text-lg mb-8">Join a room to start your video conference.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Join Room</button>
      </div>
    </Layout>
  );
};

export default Home;