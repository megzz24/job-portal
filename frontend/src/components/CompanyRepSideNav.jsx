import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideNav.css';

const CompanyRepSideNav = ({ className = '' }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className={`side-nav ${className}`}>
            <div className="logo-container">
                <h1 className="logo-text">CareerConnect</h1>
            </div>
            <ul className="nav-links">
                <li>
                    <a 
                        href="/companyrep/dashboard" 
                        className={`nav-link ${currentPath === '/companyrep/dashboard' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="/companyrep/jobposts" 
                        className={`nav-link ${currentPath === '/companyrep/jobposts' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">work</span>
                        Job Posts
                    </a>
                </li>
                <li>
                    <a 
                        href="/companyrep/profile" 
                        className={`nav-link ${currentPath === '/companyrep/profile' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">person</span>
                        Profile
                    </a>
                </li>
                <li>
                    <a 
                        href="/companyrep/settings" 
                        className={`nav-link ${currentPath === '/companyrep/settings' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default CompanyRepSideNav;