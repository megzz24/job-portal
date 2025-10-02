import React, { useState } from "react";
import apiClient from "../apiClient";
import toast from "react-hot-toast";

export default function ApplyForm({ jobId, onClose, onSuccess }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Only PDF or DOC/DOCX files are allowed.");
        setResume(null);
        return;
      }

      // Validate file size (<5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be under 5MB.");
        setResume(null);
        return;
      }
    }
    setResume(file || null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError("Please attach your resume.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("cover_letter", coverLetter);
      formData.append("resume", resume);

      const res = await apiClient.post(`/jobs/${jobId}/apply/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        onSuccess?.(res.data);
        onClose();
        toast.success("Application submitted successfully!");
      } else {
        setError("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Application failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <header className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Apply for this job</h2>
        <p className="text-sm text-gray-500 mt-1">
          Attach your resume and write a short cover letter (optional)
        </p>
      </header>

      <main className="p-6">
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              rows={6}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full rounded-lg border-gray-300 bg-gray-50 p-3"
              placeholder="Introduce yourself and why you're a good fit..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Resume (PDF or DOC/DOCX)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !resume}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
            >
              {loading ? "Applying..." : "Submit Application"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
