import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './pages/Index';
import Persons from './pages/Persons';
import Tracking from './pages/Tracking';
import Live from './pages/Live';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Persons />} />
          <Route path="persons" element={<Persons />} />
          <Route path="search" element={<Tracking />} />
          <Route path="live" element={<Live />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
