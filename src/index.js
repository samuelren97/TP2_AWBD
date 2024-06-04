import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './i18n/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-t5vp553ys025tvna.us.auth0.com"
        clientId="Fet0R63SrpJ0ju9ItViQ577i228ww96e"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>
);