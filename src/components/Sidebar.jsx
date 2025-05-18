import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Make sure this line is added in your app

const Sidebar = () => {
    return (
        <div
            className="bg-dark text-white p-4 shadow"
            style={{
                width: '250px',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                overflowY: 'auto',
                zIndex: 1000,
            }}
        >
            <h4 className="mb-4 text-center">
                <i className="bi bi-person-bounding-box me-2"></i>
                Face Stream
            </h4>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <NavLink
                        to="/persons"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? 'bg-white text-dark fw-bold' : 'text-white'
                            }`
                        }
                    >
                        <i className="bi bi-people-fill me-2"></i> Persons
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? 'bg-white text-dark fw-bold' : 'text-white'
                            }`
                        }
                    >
                        <i className="bi bi-search me-2"></i> Search
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/live"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center px-3 py-2 rounded ${isActive ? 'bg-white text-dark fw-bold' : 'text-white'
                            }`
                        }
                    >
                        <i className="bi bi-camera-video-fill me-2"></i> Live
                    </NavLink>
                </li>
                {/* Add more links here with similar structure */}
            </ul>
        </div>
    );
};

export default Sidebar;
