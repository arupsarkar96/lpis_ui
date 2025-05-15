import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Index from './components/Index';
import Exact from './components/Exact';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fw-bold" to="/">Face Match</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/exact" style={{ transition: 'color 0.3s ease' }}>Exact Match</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="container-fluid py-5">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exact" element={<Exact />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
