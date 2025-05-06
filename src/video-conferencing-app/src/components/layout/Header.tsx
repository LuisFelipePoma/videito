import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Video Conferencing App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/room" className="hover:underline">Room</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;