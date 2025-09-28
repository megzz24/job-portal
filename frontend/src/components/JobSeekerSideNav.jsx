import React from 'react';
import { useLocation } from 'react-router-dom';
import './SideNav.css';

const JobSeekerSideNav = ({ className = '' }) => {
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
                        href="/jobseeker/dashboard" 
                        className={`nav-link ${currentPath === '/jobseeker/dashboard' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="/jobseeker/jobfinder" 
                        className={`nav-link ${currentPath === '/jobseeker/jobfinder' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">search</span>
                        Find Jobs
                    </a>
                </li>
                <li>
                    <a 
                        href="/jobseeker/profile" 
                        className={`nav-link ${currentPath === '/jobseeker/profile' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">person</span>
                        Profile
                    </a>
                </li>
                <li>
                    <a 
                        href="/jobseeker/settings" 
                        className={`nav-link ${currentPath === '/jobseeker/settings' ? 'active' : ''}`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        Settings
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default JobSeekerSideNav;