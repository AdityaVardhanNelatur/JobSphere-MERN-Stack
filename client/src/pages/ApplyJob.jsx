import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { Upload } from "lucide-react";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume (PDF)");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);

      await API.post(`/applications/apply/${jobId}`, formData);

      alert("✅ Application submitted successfully");
      navigate("/my-applications");

    } catch (error) {
      console.error("Apply failed:", error);
      alert(error.response?.data?.message || "Apply failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          required
          className="mb-4"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <Upload size={18} />
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
