import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';  
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element not found");
}

const root = createRoot(rootElement as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

serviceWorkerRegistration.unregister(); 
reportWebVitals();
