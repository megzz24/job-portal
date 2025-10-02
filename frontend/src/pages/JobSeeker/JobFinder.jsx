import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobSeekerSideNav from "../../components/JobSeekerSideNav";
import Modal from "../../components/Modal";
import ApplyForm from "../../components/ApplyForm";
import apiClient from "../../apiClient";

// --- SVG Icons ---
const SearchIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const SavedIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
    />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const LocationPinIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const SalaryIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 11.21 12.77 11 12 11s-1.536.21-2.121.536c-1.172.879-1.172 2.303 0 3.182z"
    />
  </svg>
);

const BriefcaseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.072a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-4.072M20.25 14.15V9.75a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25v4.425m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0l-2.25-2.25m0 0l-2.25 2.25m-12-2.25l2.25 2.25m0 0l2.25-2.25"
    />
  </svg>
);

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <h4 className="font-semibold text-gray-700">{label}</h4>
        <div className="text-gray-500">{value}</div>
      </div>
    </div>
  );
}

const UserIcon = ({ className = "h-5 w-5 text-gray-400 mt-0.5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 21a7.5 7.5 0 0115 0H4.5z"
    />
  </svg>
);

export default function CareerConnect() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isMobileDetailVisible, setIsMobileDetailVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedRemote, setSelectedRemote] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useEffect(() => {
    apiClient
      .get("jobs/jobslist/", { skipAuth: false })
      .then((res) => {
        setJobs(res.data);
        setSelectedJob(res.data[0] || null);
      })
      .catch(() => setError("Failed to fetch jobs"))
      .finally(() => setLoading(false));
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    if (window.innerWidth < 768) setIsMobileDetailVisible(true);
  };

  const handleBackClick = () => setIsMobileDetailVisible(false);
  const openApply = () => setIsApplyOpen(true);
  const closeApply = () => setIsApplyOpen(false);

  const onApplySuccess = (data) => console.log("Application submitted", data);

  const handleSaveJob = (jobId) => {
    apiClient
      .post(`jobs/${jobId}/save/`)
      .then(() =>
        setSavedJobs((prev) =>
          prev.includes(jobId)
            ? prev.filter((id) => id !== jobId)
            : [...prev, jobId]
        )
      )
      .catch(() => alert("Failed to save job"));
  };

  // --- Filtered Jobs ---
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation
      ? job.location === selectedLocation
      : true;
    const matchesSalary = selectedSalary
      ? job.salary_range === selectedSalary
      : true;
    const matchesRemote = selectedRemote
      ? job.remote_status === selectedRemote
      : true;
    const matchesJobType = selectedJobType
      ? job.job_type === selectedJobType
      : true;
    const matchesCompany = companyFilter
      ? job.company.name === companyFilter
      : true;
    const matchesSaved = showSavedOnly ? savedJobs.includes(job.id) : true;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesSalary &&
      matchesRemote &&
      matchesJobType &&
      matchesCompany &&
      matchesSaved
    );
  });

  if (loading) return <div className="p-4 text-center">Loading jobs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-slate-50 font-sans text-gray-800 antialiased">
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="material-symbols-outlined">
          {menuOpen ? "close" : "menu"}
        </span>
      </button>
      <JobSeekerSideNav className={menuOpen ? "open" : ""} />

      <div className="main-content-wrapper">
        <div className="container mx-auto flex min-h-screen flex-col md:flex-row md:gap-8 md:p-4">
          {/* Job List */}
          <main
            className={`w-full md:w-3/4 lg:w-2/5 transition-transform duration-300 ease-in-out ${
              isMobileDetailVisible ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <header className="flex md:hidden items-center justify-start space-x-4 p-4">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-gray-600"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="text-xl font-bold">Job Listings</h1>
            </header>

            <div className="p-4 md:py-6">
              <h1 className="text-2xl font-bold mb-4 hidden md:block">
                Job Listings
              </h1>

              {/* Search */}
              <div className="relative mb-4">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for jobs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border-none bg-blue-50/50 py-3 pl-12 pr-4 text-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  <option value="">Locations</option>
                  {Array.from(new Set(jobs.map((job) => job.location))).map(
                    (loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={selectedSalary}
                  onChange={(e) => setSelectedSalary(e.target.value)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  <option value="">Salaries</option>
                  {Array.from(new Set(jobs.map((job) => job.salary_range))).map(
                    (sal) => (
                      <option key={sal} value={sal}>
                        {sal}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={selectedRemote}
                  onChange={(e) => setSelectedRemote(e.target.value)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  <option value="">Remote</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  <option value="">Job Types</option>
                  {Array.from(new Set(jobs.map((job) => job.job_type))).map(
                    (type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="rounded-lg border px-4 py-2 text-sm text-gray-700 shadow-sm"
                >
                  <option value="">Companies</option>
                  {Array.from(new Set(jobs.map((job) => job.company.name))).map(
                    (company) => (
                      <option key={company} value={company}>
                        {company}
                      </option>
                    )
                  )}
                </select>

                <button
                  onClick={() => {
                    setSelectedLocation("");
                    setSelectedSalary("");
                    setSelectedRemote("");
                    setSelectedJobType("");
                    setCompanyFilter("");
                  }}
                  className="ml-2 flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 mr-1 text-sm text-red-400 shadow-sm hover:bg-red-200"
                >
                  <span className="material-symbols-outlined text-red-700">
                    close
                  </span>
                  Clear All
                </button>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={showSavedOnly}
                      onChange={() => setShowSavedOnly((prev) => !prev)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    Saved Jobs
                  </label>
                </div>
              </div>

              {/* Job List */}
              <div className="space-y-3">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => handleJobClick(job)}
                    className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all duration-200 ${
                      selectedJob?.id === job.id
                        ? "border-blue-500 bg-white shadow-md"
                        : "border-transparent bg-white hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-500 font-bold text-2xl">
                        {job.company.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">
                          {job.company.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(job.posted_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* --- Tags Section --- */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {/* Remote Status */}
                      {job.remote_status && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-700">
                          {job.remote_status.toLowerCase() === "yes"
                            ? "Remote"
                            : "Onsite"}
                        </span>
                      )}

                      {/* Job Type */}
                      {job.job_type && (
                        <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          {job.job_type}
                        </span>
                      )}

                      {/* Skills */}
                      {job.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-pink-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Job Details Pane (Desktop) */}
          {/* Job + Company Details Pane */}
          <aside className="hidden lg:block lg:w-2/5 py-6 pl-4">
            {selectedJob && (
              <div className="sticky top-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
                  {/* Job Details */}
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-500 font-bold text-3xl">
                      {selectedJob.company.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">
                      {selectedJob.title}
                    </h2>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={openApply}
                      className="flex-1 rounded-xl bg-sky-500 px-6 py-3 text-white font-semibold hover:bg-sky-600 transition-colors"
                    >
                      Apply Now
                    </button>
                    <button
                      className={`rounded-xl border p-3 transition-colors ${
                        savedJobs.includes(selectedJob.id)
                          ? "border-blue-500 text-blue-500 bg-blue-50"
                          : "border-gray-300 text-gray-500 hover:bg-gray-100"
                      }`}
                      onClick={() => handleSaveJob(selectedJob.id)}
                    >
                      <SavedIcon
                        className={`h-6 w-6 ${
                          savedJobs.includes(selectedJob.id)
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Job Details Items */}
                  <div className="space-y-4 text-sm">
                    <DetailItem
                      icon={
                        <LocationPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      }
                      label="Location"
                      value={selectedJob.location}
                    />
                    <DetailItem
                      icon={
                        <SalaryIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      }
                      label="Salary"
                      value={selectedJob.salary_range}
                    />
                    <DetailItem
                      icon={
                        <BriefcaseIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      }
                      label="Job Description"
                      value={selectedJob.description}
                    />
                    <DetailItem
                      icon={
                        <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      }
                      label="Posted By"
                      value={
                        selectedJob.posted_by
                          ? `${selectedJob.posted_by.name}${
                              selectedJob.posted_by.role
                                ? ` (${selectedJob.posted_by.role})`
                                : ""
                            }`
                          : "N/A"
                      }
                    />
                  </div>

                  <hr className="my-4 border-gray-200" />

                  {/* Company Details Items */}
                  <div className="space-y-4 text-sm">
                    <h3 className="text-xl font-bold text-center">
                      {selectedJob.company.name}
                    </h3>

                    {selectedJob.company.location && (
                      <DetailItem
                        icon={
                          <LocationPinIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                        }
                        label="Location"
                        value={selectedJob.company.location}
                      />
                    )}

                    {selectedJob.company.website && (
                      <DetailItem
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        }
                        label="Website"
                        value={
                          <a
                            href={selectedJob.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {selectedJob.company.website}
                          </a>
                        }
                      />
                    )}

                    {selectedJob.company.industry && (
                      <DetailItem
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-700 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 21V8l7-5 7 5v13M14 21v-7H10v7"
                            />
                          </svg>
                        }
                        label="Industry"
                        value={selectedJob.company.industry}
                      />
                    )}

                    {selectedJob.company.description && (
                      <DetailItem
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5h18M3 10h18M3 15h18M3 20h18"
                            />
                          </svg>
                        }
                        label="Description"
                        value={selectedJob.company.description}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal isOpen={isApplyOpen} onClose={closeApply}>
        <ApplyForm
          jobId={selectedJob?.id}
          onClose={closeApply}
          onSuccess={onApplySuccess}
        />
      </Modal>
    </div>
  );
}
