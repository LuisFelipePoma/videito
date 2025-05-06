# Video Conferencing Application

This project is a video conferencing application built using React, Vite, and Tailwind CSS. It utilizes Mediasoup for handling real-time media streaming and WebSocket for communication between clients and the server.

## Features

- Real-time video and audio streaming
- Participant management
- Media controls for muting/unmuting and starting/stopping video
- Responsive layout using Tailwind CSS
- Context API for state management

## Project Structure

```
video-conferencing-app
├── src
│   ├── assets              # Static assets (images, fonts)
│   ├── components          # Reusable components
│   ├── context             # Context providers for state management
│   ├── hooks               # Custom hooks for managing state and logic
│   ├── pages               # Application pages
│   ├── services            # Services for Mediasoup and WebSocket
│   ├── types               # TypeScript types and interfaces
│   ├── utils               # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point of the application
│   └── vite-env.d.ts       # TypeScript definitions for Vite
├── public
│   └── favicon.ico         # Application favicon
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore file
├── index.html              # Main HTML file
├── package.json            # npm configuration
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd video-conferencing-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.