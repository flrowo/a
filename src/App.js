import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './content/Main';
import { Provider } from 'react-redux';
import store from './redux/store';
import ToastrManager from './libs/toastflr/ToastrManager';

export default function App() {
    return (
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route index path="*" element={<Main />} />
                </Routes>
            </Router>
            <ToastrManager />
        </Provider>
    );
}