import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-lg font-bold">Video Conferencing</h2>
        <nav className="mt-4">
          <ul>
            <li className="py-2 hover:bg-gray-700 rounded">
              <a href="#participants">Participants</a>
            </li>
            <li className="py-2 hover:bg-gray-700 rounded">
              <a href="#settings">Settings</a>
            </li>
            <li className="py-2 hover:bg-gray-700 rounded">
              <a href="#help">Help</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;