import React, { useState } from 'react';
import './Jobposts.css';

// --- Mock Data ---
// In a real application, this data would come from an API.
const jobsData = [
    { id: 1, title: 'Software Engineer', status: 'Active', applicantCount: 12 },
    { id: 2, title: 'Product Manager', status: 'Active', applicantCount: 8 },
    { id: 3, title: 'UX Designer', status: 'Closed', applicantCount: 25 },
    { id: 4, title: 'Data Analyst', status: 'Active', applicantCount: 15 },
    { id: 5, title: 'Marketing Specialist', status: 'Closed', applicantCount: 30 },
];

const applicantsData = {
    1: [
        { name: 'Ethan Harper', date: '2024-01-15', status: 'New' },
        { name: 'Olivia Bennett', date: '2024-01-16', status: 'Reviewed' },
        { name: 'Noah Carter', date: '2024-01-17', status: 'Interviewed' },
        { name: 'Ava Mitchell', date: '2024-01-18', status: 'New' },
        { name: 'Liam Foster', date: '2024-01-19', status: 'Reviewed' },
        { name: 'Isabella Reed', date: '2024-01-20', status: 'New' },
    ],
    // Add more applicants for other jobs if needed
    2: [{ name: 'Jane Doe', date: '2024-02-01', status: 'New' }],
    3: [{ name: 'John Smith', date: '2024-02-05', status: 'Reviewed' }],
    4: [{ name: 'Emily White', date: '2024-02-10', status: 'Interviewed' }],
    5: [{ name: 'Michael Brown', date: '2024-02-15', status: 'New' }],
};

// --- Helper Components ---

const SideNav = () => (
    <nav className="side-nav">
        <div className="logo-container">
            <h2 className="logo-text">CareerConnect</h2>
        </div>
        <div className="nav-links-container">
            <ul className="nav-links">
                <li><a href="#" className="nav-link"><span className="material-symbols-outlined">home</span><span>Home</span></a></li>
                <li><a href="#" className="nav-link active"><span className="material-symbols-outlined">work</span><span>My Jobs</span></a></li>
                <li><a href="#" className="nav-link"><span className="material-symbols-outlined">chat_bubble</span><span>Messages</span></a></li>
                <li><a href="#" className="nav-link"><span className="material-symbols-outlined">person</span><span>Profile</span></a></li>
            </ul>
        </div>
    </nav>
);

const MobileNav = () => (
    <nav className="mobile-nav">
        <div className="mobile-nav-inner">
            <a href="#" className="mobile-nav-link"><span className="material-symbols-outlined">home</span><span>Home</span></a>
            <a href="#" className="mobile-nav-link active"><span className="material-symbols-outlined">work</span><span>My Jobs</span></a>
            <a href="#" className="mobile-nav-link"><span className="material-symbols-outlined">chat_bubble</span><span>Messages</span></a>
            <a href="#" className="mobile-nav-link"><span className="material-symbols-outlined">person</span><span>Profile</span></a>
        </div>
        <div className="safe-area"></div>
    </nav>
);

const JobCard = ({ job, onSelect }) => (
    <div className="job-card" onClick={() => onSelect(job)}>
        <div className="job-card-header">
            <div className="job-card-info">
                <div className="job-icon-wrapper">
                    <span className="material-symbols-outlined job-icon">work</span>
                </div>
                <div>
                    <p className="job-title">{job.title}</p>
                    <div className="job-status">
                        <span className={`status-dot ${job.status.toLowerCase()}`}></span>
                        <p className="status-text">{job.status}</p>
                    </div>
                </div>
            </div>
            <div className="job-card-applicants">
                <p className="applicant-count">{job.applicantCount}</p>
                <p className="applicant-label">Applicants</p>
            </div>
        </div>
    </div>
);

// --- Main Views ---

const JobListings = ({ onJobSelect }) => (
    <div className="job-listings-container">
        <SideNav />
        <div className="main-content-wrapper">
            <div className="main-content">
                <header className="main-header">
                    <div className="header-placeholder-mobile"></div>
                    <h1 className="header-title">My Jobs</h1>
                    <button className="new-job-btn">
                        <span className="material-symbols-outlined">add</span>
                        <span className="new-job-btn-text">New Job</span>
                    </button>
                </header>
                <main className="job-grid-container">
                    <div className="job-grid">
                        {jobsData.map(job => (
                            <JobCard key={job.id} job={job} onSelect={onJobSelect} />
                        ))}
                    </div>
                </main>
            </div>
            <MobileNav />
        </div>
    </div>
);

const ApplicantList = ({ job, onBack }) => {
    const applicants = applicantsData[job.id] || [];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'new': return 'status-new';
            case 'reviewed': return 'status-reviewed';
            case 'interviewed': return 'status-interviewed';
            default: return '';
        }
    };

    return (
        <div className="applicant-view-container">
            <header className="applicant-header">
                <div className="applicant-header-inner">
                    <div className="header-nav">
                        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="back-link">
                            <span className="material-symbols-outlined">arrow_back_ios_new</span>
                            <span className="back-link-text">Back to Job Dashboard</span>
                        </a>
                        <h1 className="applicant-header-title">Applicants</h1>
                        <div className="header-actions">
                            <button className="filter-btn">
                                <span className="material-symbols-outlined">filter_list</span>
                                <span>Filter</span>
                            </button>
                            <button className="mobile-search-btn"><span className="material-symbols-outlined">search</span></button>
                            <button className="more-btn"><span className="material-symbols-outlined">more_vert</span></button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="applicant-main">
                <div className="job-details-header">
                    <h2 className="job-title-large">{job.title}</h2>
                    <p className="job-description-subtle">This page lists all applicants for the selected job from your dashboard.</p>
                </div>

                {/* Desktop Table */}
                <div className="applicant-table-container">
                    <table className="applicant-table">
                        <thead>
                            <tr>
                                <th>Applicant Name</th>
                                <th>Date Applied</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants.map((applicant, index) => (
                                <tr key={index}>
                                    <td>{applicant.name}</td>
                                    <td>{applicant.date}</td>
                                    <td><span className={`status-badge ${getStatusClass(applicant.status)}`}>{applicant.status}</span></td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="resume-btn">Resume</button>
                                            <button className="more-btn"><span className="material-symbols-outlined">more_vert</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card List */}
                <div className="applicant-list-mobile">
                    {applicants.map((applicant, index) => (
                        <div key={index} className="applicant-card-mobile">
                            <div className="applicant-info">
                                <p className="applicant-name">{applicant.name}</p>
                                <p className="applicant-date">Applied on {applicant.date}</p>
                                <span className={`status-badge ${getStatusClass(applicant.status)}`}>{applicant.status}</span>
                            </div>
                            <div className="action-buttons">
                                <button className="resume-btn">Resume</button>
                                <button className="more-btn"><span className="material-symbols-outlined">more_vert</span></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};


// --- Main App Component ---

function Jobposts() {
    const [selectedJob, setSelectedJob] = useState(null);

    const handleJobSelect = (job) => {
        setSelectedJob(job);
    };

    const handleBack = () => {
        setSelectedJob(null);
    };

    return (
        <div className="job-portal-app">
            {selectedJob ? (
                <ApplicantList job={selectedJob} onBack={handleBack} />
            ) : (
                <JobListings onJobSelect={handleJobSelect} />
            )}
        </div>
    );
}

export default Jobposts;