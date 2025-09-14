import React, { useState } from 'react';

// --- SVG Icons ---
// Using inline SVGs to avoid extra dependencies or file requests.

const SearchIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const HomeIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

const SavedIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

const ProfileIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const LocationPinIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const SalaryIcon = ({ className = "w-6 h-6" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 11 12 11s-1.536.21-2.121.536c-1.172.879-1.172 2.303 0 3.182z" />
    </svg>
);

const BriefcaseIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.072a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.072M20.25 14.15V9.75a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25v4.425m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0l-2.25-2.25m0 0l-2.25 2.25m-12-2.25l2.25 2.25m0 0l2.25-2.25" />
    </svg>
);


// --- Mock Data ---
const jobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', time: '2 days ago', logo: 'https://placehold.co/100x100/2C5F2D/FFFFFF?text=T', location: 'San Francisco, CA (Remote)', salary: '$150,000 - $180,000 per year', description: 'We are seeking a highly skilled Senior Software Engineer to join our dynamic team. The ideal candidate will have extensive experience in building scalable web applications and a passion for technology...' },
    { id: 2, title: 'Product Manager', company: 'Global Innovations Ltd.', time: '5 days ago', logo: 'https://placehold.co/100x100/FFF8F0/333333?text=G', location: 'New York, NY', salary: '$120,000 - $150,000 per year', description: 'Lead the product development lifecycle from conception to launch. You will work closely with engineering, design, and marketing teams to deliver innovative products.' },
    { id: 3, title: 'Data Scientist', company: 'Data Analytics Corp.', time: '1 week ago', logo: 'https://placehold.co/100x100/2C5F2D/FFFFFF?text=D', location: 'Austin, TX', salary: '$130,000 - $160,000 per year', description: 'Analyze large, complex data sets to identify trends, develop predictive models, and provide actionable insights that drive business decisions.' },
    { id: 4, title: 'UX/UI Designer', company: 'Creative Design Studio', time: '2 weeks ago', logo: 'https://placehold.co/100x100/2C5F2D/FFFFFF?text=C', location: 'Los Angeles, CA', salary: '$90,000 - $110,000 per year', description: 'Create intuitive and visually appealing user interfaces for web and mobile applications. A strong portfolio of successful UX/UI design is required.' },
    { id: 5, title: 'Financial Analyst', company: 'Financial Services Group', time: '3 weeks ago', logo: 'https://placehold.co/100x100/2C5F2D/FFFFFF?text=F', location: 'Chicago, IL', salary: '$85,000 - $105,000 per year', description: 'Responsible for financial planning, analysis, and projection. You will forecast future revenues and expenditures to establish cost structures and determine capital budgeting.' },
];

// --- Main App Component ---
export default function CareerConnect() {
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
    const [isMobileDetailVisible, setIsMobileDetailVisible] = useState(false);

    const handleJobClick = (job) => {
        setSelectedJob(job);
        if (window.innerWidth < 768) { // md breakpoint in Tailwind
            setIsMobileDetailVisible(true);
        }
    }
    
    const handleBackClick = () => {
        setIsMobileDetailVisible(false);
    }

    return (
        <div className="bg-slate-50 font-sans text-gray-800 antialiased">
            <div className="container mx-auto flex min-h-screen flex-col md:flex-row md:gap-8 md:p-4">
                
                {/* --- Left Sidebar (Desktop) --- */}
                <aside className="hidden md:flex md:w-1/4 lg:w-1/5 flex-col space-y-6 py-6 pr-4">
                    <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 017.5 2h5A1.5 1.5 0 0114 3.5v1.148a1.5 1.5 0 01-.826 1.353l-2.5 1.25a1.5 1.5 0 01-1.348 0l-2.5-1.25A1.5 1.5 0 016 4.648V3.5zM4 9a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0116 9v5.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 14.5V9z" clipRule="evenodd" />
                        </svg>
                        <span>CareerConnect</span>
                    </div>
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg bg-blue-100 px-3 py-2 font-semibold text-blue-600">
                                    <SearchIcon className="h-5 w-5" />
                                    <span>Search</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                                    <HomeIcon className="h-5 w-5" />
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                                    <SavedIcon className="h-5 w-5" />
                                    <span>Saved</span>
                                </a>
                            </li>
                             <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                                    <ProfileIcon className="h-5 w-5" />
                                    <span>Profile</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className={`w-full md:w-3/4 lg:w-2/5 transition-transform duration-300 ease-in-out ${isMobileDetailVisible ? '-translate-x-full' : 'translate-x-0'} md:translate-x-0`}>
                    {/* --- Mobile Header --- */}
                    <header className="flex md:hidden items-center justify-start space-x-4 p-4">
                        <button className="text-gray-600">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold">Job Listings</h1>
                    </header>

                    <div className="p-4 md:py-6">
                         <h1 className="text-2xl font-bold mb-4 hidden md:block">Job Listings</h1>
                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                               <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for jobs"
                                className="w-full rounded-xl border-none bg-blue-50/50 py-3 pl-12 pr-4 text-gray-700 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 mb-4">
                           <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                               <span>Location</span> <ChevronDownIcon />
                           </button>
                            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                               <span>Salary</span> <ChevronDownIcon />
                           </button>
                           <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                               <span>Remote</span> <ChevronDownIcon />
                           </button>
                           <button className="hidden md:flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                               <span>Job Type</span> <ChevronDownIcon />
                           </button>
                        </div>
                        
                        {/* Job List */}
                        <div className="space-y-3">
                            {jobs.map(job => (
                                <div
                                    key={job.id}
                                    onClick={() => handleJobClick(job)}
                                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all duration-200 ${selectedJob?.id === job.id ? 'border-blue-500 bg-white shadow-md' : 'border-transparent bg-white hover:shadow-md'}`}
                                >
                                    <img src={job.logo} alt={`${job.company} logo`} className="h-12 w-12 flex-shrink-0 rounded-lg object-cover mt-1" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-gray-900">{job.title}</h3>
                                        <p className="text-sm text-gray-600">{job.company}</p>
                                        <p className="mt-1 text-xs text-gray-400">Posted {job.time}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* --- Right Details Pane (Desktop) --- */}
                <aside className="hidden lg:block lg:w-2/5 py-6 pl-4">
                    {selectedJob && (
                        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm">
                           <div className="flex flex-col items-center text-center">
                               <img src={selectedJob.logo} alt={`${selectedJob.company} logo`} className="h-20 w-20 rounded-xl object-cover" />
                               <h2 className="mt-4 text-2xl font-bold">{selectedJob.title}</h2>
                               <p className="text-md text-gray-500">{selectedJob.company}</p>
                           </div>
                           <div className="my-6 flex justify-center gap-3">
                                <button className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">Apply Now</button>
                                <button className="rounded-xl border border-gray-300 p-3 text-gray-500 hover:bg-gray-100 transition-colors">
                                    <SavedIcon className="h-6 w-6"/>
                                </button>
                           </div>
                           <div className="space-y-6 text-sm">
                                <div className="flex items-start gap-3">
                                    <LocationPinIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Location</h4>
                                        <p className="text-gray-500">{selectedJob.location}</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <SalaryIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Salary</h4>
                                        <p className="text-gray-500">{selectedJob.salary}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <BriefcaseIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Job Description</h4>
                                        <p className="text-gray-500 leading-relaxed">{selectedJob.description}</p>
                                    </div>
                                </div>
                           </div>
                        </div>
                    )}
                </aside>

                {/* --- Mobile Job Detail View (Overlay) --- */}
                <div className={`fixed inset-0 bg-slate-50 z-10 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileDetailVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                    <header className="flex items-center justify-start space-x-4 p-4 border-b">
                        <button onClick={handleBackClick} className="text-gray-600">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold">Job Details</h1>
                    </header>
                    {selectedJob && (
                         <div className="p-4">
                           <div className="flex flex-col items-center text-center">
                               <img src={selectedJob.logo} alt={`${selectedJob.company} logo`} className="h-20 w-20 rounded-xl object-cover" />
                               <h2 className="mt-4 text-2xl font-bold">{selectedJob.title}</h2>
                               <p className="text-md text-gray-500">{selectedJob.company}</p>
                           </div>
                           <div className="my-6 flex justify-center gap-3">
                                <button className="flex-1 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">Apply Now</button>
                                <button className="rounded-xl border border-gray-300 p-3 text-gray-500 hover:bg-gray-100 transition-colors">
                                    <SavedIcon className="h-6 w-6"/>
                                </button>
                           </div>
                           <div className="space-y-6 text-sm">
                                <div className="flex items-start gap-3">
                                    <LocationPinIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Location</h4>
                                        <p className="text-gray-500">{selectedJob.location}</p>
                                    </div>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <SalaryIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Salary</h4>
                                        <p className="text-gray-500">{selectedJob.salary}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <BriefcaseIcon className="h-5 w-5 flex-shrink-0 text-gray-400 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-700">Job Description</h4>
                                        <p className="text-gray-500 leading-relaxed">{selectedJob.description}</p>
                                    </div>
                                </div>
                           </div>
                        </div>
                    )}
                </div>


                {/* --- Bottom Navigation (Mobile) --- */}
                <nav className={`fixed bottom-0 left-0 right-0 z-20 flex justify-around border-t bg-white p-2 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-300 ease-in-out ${isMobileDetailVisible ? 'translate-y-full' : 'translate-y-0'}`}>
                    <a href="#" className="flex flex-col items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 w-1/4">
                        <HomeIcon />
                        <span className="text-xs">Home</span>
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center rounded-lg bg-blue-100 p-2 text-blue-600 w-1/4">
                        <SearchIcon />
                        <span className="text-xs font-semibold">Search</span>
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 w-1/4">
                        <SavedIcon />
                        <span className="text-xs">Saved</span>
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 w-1/4">
                        <ProfileIcon />
                        <span className="text-xs">Profile</span>
                    </a>
                </nav>
            </div>
        </div>
    );
}
