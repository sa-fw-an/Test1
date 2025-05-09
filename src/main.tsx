// main.tsx (or index.tsx)
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'core-js/proposals/global-this';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/globals.css';
import '@/utils/copy-code';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
