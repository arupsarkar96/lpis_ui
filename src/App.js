import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Exact from './components/Exact';

import Index from './pages/Index';
import Persons from './pages/Persons';
import Tracking from './pages/Tracking';
import Live from './pages/Live';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
//         <div className="container-fluid">
//           <Link className="navbar-brand fs-3 fw-bold" to="/">Face Match</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link className="nav-link fs-5" to="/best" style={{ transition: 'color 0.3s ease' }}>Best Match</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link fs-5" to="/live" style={{ transition: 'color 0.3s ease' }}>Live</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>


//       <div className="container-fluid py-5">
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/best" element={<Exact />} />
//           <Route path="/live" element={<Live />} />
//         </Routes>
//       </div>

//     </BrowserRouter>
//   );
// }


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
        {/* <Route path="/exact" element={<Exact />} />
        <Route path="/live" element={<Live />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
