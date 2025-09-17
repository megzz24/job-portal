import React, { useState } from 'react';

const JobPostForm = () => {
  // State to manage the current step of the form
  const [step, setStep] = useState(1);

  // State to hold all the form data from all steps
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: 'Full-time', // Default value
    salaryMin: '',
    salaryMax: '',
    jobDescription: '',
    jobRequirements: '',
  });

  // Handler to update form data state on input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Functions to navigate between steps
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Placeholder for final form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Form Data:', formData);
    // Here you would typically send the data to your server
    alert('Job posting submitted successfully! (Check the console for data)');
  };

  return (
    <div className="w-full">
      {/* Header updates based on the current step */}
      <header className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Create a Job Posting</h2>
        <p className="text-sm text-gray-500 mt-1">
          {step === 1 ? 'Step 1 of 2: Basic Details' : 'Step 2 of 2: Role Information'}
        </p>
      </header>

      {/* The main content area where the form is rendered */}
      <main className="p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* ----- STEP 1 FIELDS ----- */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="jobTitle">
                  Job Title
                </label>
                <input
                  className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  id="jobTitle"
                  placeholder="e.g., Senior React Developer"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  id="companyName"
                  placeholder="e.g., Innovatech Solutions"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="location">
                  Location
                </label>
                <input
                  className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  id="location"
                  placeholder="e.g., Aluva, Kerala (Remote)"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* ----- STEP 2 FIELDS ----- */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="jobType">
                  Job Type
                </label>
                <select
                  id="jobType"
                  className="form-select w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Proposed Salary (Annual)</label>
                <div className="flex items-center gap-3">
                  <input
                    className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    id="salaryMin"
                    placeholder="₹ Minimum"
                    type="number"
                    value={formData.salaryMin}
                    onChange={handleChange}
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    className="form-input w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    id="salaryMax"
                    placeholder="₹ Maximum"
                    type="number"
                    value={formData.salaryMax}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="jobDescription">
                  Job Description
                </label>
                <textarea
                  className="form-textarea w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  id="jobDescription"
                  rows="4"
                  placeholder="Describe the role and responsibilities..."
                  value={formData.jobDescription}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="jobRequirements">
                  Skills & Requirements
                </label>
                <textarea
                  className="form-textarea w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  id="jobRequirements"
                  rows="4"
                  placeholder="List key skills, qualifications, and experience needed..."
                  value={formData.jobRequirements}
                  onChange={handleChange}
                ></textarea>
              </div>
            </>
          )}
        </form>
      </main>

      {/* Footer with dynamic navigation buttons */}
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
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out"
            >
              Post Job
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default JobPostForm;