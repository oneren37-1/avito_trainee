import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';
import {ConfigProvider, theme} from "antd";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm
        }}>
            <App />
        </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
