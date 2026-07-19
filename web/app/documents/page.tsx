"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<"rewrite" | "cover-letter">("rewrite");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // Rewrite form
  const [rewriteForm, setRewriteForm] = useState({
    bullet: "",
    jobDescription: "",
  });

  // Cover letter form
  const [coverForm, setCoverForm] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleRewriteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/ai/rewrite-bullet`,
        {
          bullet: rewriteForm.bullet,
          jobDescription: rewriteForm.jobDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data.rewritten);
    } catch (error) {
      alert("Failed to rewrite bullet");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/ai/cover-letter`,
        {
          jobTitle: coverForm.jobTitle,
          companyName: coverForm.companyName,
          jobDescription: coverForm.jobDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data.coverLetter);
    } catch (error) {
      alert("Failed to generate cover letter");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container py-10">
      <Link href="/" className="text-indigo-600 mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => {
              setActiveTab("rewrite");
              setResult("");
            }}
            className={`flex-1 py-4 px-6 font-semibold ${
              activeTab === "rewrite"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-slate-600"
            }`}
          >
            Rewrite Bullet
          </button>
          <button
            onClick={() => {
              setActiveTab("cover-letter");
              setResult("");
            }}
            className={`flex-1 py-4 px-6 font-semibold ${
              activeTab === "cover-letter"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-slate-600"
            }`}
          >
            Generate Cover Letter
          </button>
        </div>

        <div className="p-8">
          {activeTab === "rewrite" && (
            <form onSubmit={handleRewriteSubmit} className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Resume Bullet Rewriter</h2>
              <p className="text-slate-600 mb-6">
                Paste a resume bullet point and the job description to get an AI-optimized version.
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Resume Bullet
                </label>
                <textarea
                  value={rewriteForm.bullet}
                  onChange={(e) =>
                    setRewriteForm({ ...rewriteForm, bullet: e.target.value })
                  }
                  placeholder="e.g., Worked on website and improved performance"
                  rows={4}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={rewriteForm.jobDescription}
                  onChange={(e) =>
                    setRewriteForm({ ...rewriteForm, jobDescription: e.target.value })
                  }
                  placeholder="Paste the job description here"
                  rows={6}
                  className="input-field"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Rewriting..." : "Rewrite Bullet"}
              </button>
            </form>
          )}

          {activeTab === "cover-letter" && (
            <form onSubmit={handleCoverLetterSubmit} className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Cover Letter Generator</h2>
              <p className="text-slate-600 mb-6">
                Generate a personalized cover letter based on the job information.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={coverForm.jobTitle}
                    onChange={(e) =>
                      setCoverForm({ ...coverForm, jobTitle: e.target.value })
                    }
                    placeholder="e.g., Senior React Developer"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={coverForm.companyName}
                    onChange={(e) =>
                      setCoverForm({ ...coverForm, companyName: e.target.value })
                    }
                    placeholder="e.g., TechCorp Inc"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={coverForm.jobDescription}
                  onChange={(e) =>
                    setCoverForm({ ...coverForm, jobDescription: e.target.value })
                  }
                  placeholder="Paste the job description here"
                  rows={8}
                  className="input-field"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Cover Letter"}
              </button>
            </form>
          )}

          {result && (
            <div className="mt-8 max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Result</h3>
              <div className="bg-slate-50 border border-slate-300 rounded-lg p-6 mb-4 whitespace-pre-wrap">
                {result}
              </div>
              <button onClick={copyToClipboard} className="btn-primary">
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
