import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './content/Main';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;