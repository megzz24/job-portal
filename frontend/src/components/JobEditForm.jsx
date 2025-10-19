    import React, { useState, useEffect } from "react";
    import apiClient from "../apiClient";

    const JobEditForm = ({ jobId, onClose, updateJob }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        jobType: "full-time",
        salaryMin: "",
        salaryMax: "",
        description: "",
        skills: "",
        remoteStatus: "No",
    });

    // Fetch job details
    useEffect(() => {
        const fetchJob = async () => {
        try {
            const res = await apiClient.get(`/jobs/${jobId}/`);
            const job = res.data;
            setFormData({
            title: job.title || "",
            location: job.location || "",
            jobType: job.job_type || "full-time",
            salaryMin: job.salary_range ? job.salary_range.split("-")[0] : "",
            salaryMax: job.salary_range ? job.salary_range.split("-")[1] : "",
            description: job.description || "",
            skills: job.skills
                ? job.skills
                    .map((s) => (typeof s === "string" ? s : s.name))
                    .join(", ")
                : "",
            remoteStatus: job.remote_status || "No",
            });
        } catch (err) {
            console.error("Error fetching job details:", err);
            alert("Failed to load job details.");
        }
        };
        fetchJob();
    }, [jobId]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        const payload = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            job_type: formData.jobType,
            salary_range:
            formData.salaryMin && formData.salaryMax
                ? `${formData.salaryMin}-${formData.salaryMax}`
                : null,
            remote_status: formData.remoteStatus,
            skills: formData.skills
            ? formData.skills.split(",").map((s) => s.trim())
            : [],
        };

        const res = await apiClient.put(
            `/jobs/company/jobs/${jobId}/update/`,
            payload
        );

        if (updateJob) updateJob(res.data);
        if (onClose) onClose();
        } catch (err) {
        console.error("Error updating job:", err);
        alert(err.response?.data?.detail || "Error updating job.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="w-full">
        <header className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Edit Job Posting</h2>
            <p className="text-sm text-gray-500 mt-1">
            {step === 1
                ? "Step 1 of 2: Basic Details"
                : "Step 2 of 2: Role Information"}
            </p>
        </header>

        <main className="p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
            {step === 1 && (
                <>
                <div>
                    <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                    Job Title
                    </label>
                    <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior React Developer"
                    className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                    Location
                    </label>
                    <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Aluva, Kerala (Remote)"
                    className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label
                    htmlFor="remoteStatus"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                    Remote?
                    </label>
                    <select
                    id="remoteStatus"
                    value={formData.remoteStatus}
                    onChange={handleChange}
                    className="form-select w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </select>
                </div>
                </>
            )}

            {step === 2 && (
                <>
                <div>
                    <label
                    htmlFor="jobType"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                    Job Type
                    </label>
                    <select
                    id="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="form-select w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Proposed Salary (Annual)
                    </label>
                    <div className="flex items-center gap-3">
                    <input
                        id="salaryMin"
                        type="text"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        placeholder="₹ Minimum"
                        className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                        id="salaryMax"
                        type="text"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        placeholder="₹ Maximum"
                        className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    </div>
                </div>

                <div>
                    <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                    Job Description
                    </label>
                    <textarea
                    id="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role and responsibilities..."
                    className="form-textarea w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label
                    htmlFor="skills"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                    Skills (comma separated)
                    </label>
                    <input
                    id="skills"
                    type="text"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Django, Python"
                    className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>
                </>
            )}
            </form>
        </main>

        <footer className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
            <div className="flex justify-between items-center">
            {step === 2 && (
                <button
                type="button"
                onClick={prevStep}
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                Back
                </button>
            )}

            {step === 1 && (
                <button
                type="button"
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                >
                Proceed to Next Step
                </button>
            )}

            {step === 2 && (
                <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
                >
                {loading ? "Updating..." : "Update Job"}
                </button>
            )}
            </div>
        </footer>
        </div>
    );
    };

    export default JobEditForm;
