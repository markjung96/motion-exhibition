import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { InputProvider } from './hooks/useInputs.tsx';

const run = async () => {
    const container = document.getElementById('root');
    if (!container) throw new Error('Root element not found');

    const root = ReactDOM.createRoot(container);

    root.render(
        <React.StrictMode>
            <InputProvider>
                <App />
            </InputProvider>
        </React.StrictMode>,
    );
};

run();
