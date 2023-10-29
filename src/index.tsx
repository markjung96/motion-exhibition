import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const run = async () => {
    const container = document.getElementById('root');
    if (!container) throw new Error('Root element not found');

    const root = ReactDOM.createRoot(container);

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
};

run();
