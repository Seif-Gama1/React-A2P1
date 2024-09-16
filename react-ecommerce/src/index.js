import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppContext';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <RouterProvider router={routes} />;
    </AppProvider>
);

