import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/applications/my").then(res => {
      const alreadyApplied = res.data.find(app => app.job._id === jobId);
      if (alreadyApplied) {
        toast("You have already applied for this job");
        navigate("/jobs");
      }
    });
  }, [jobId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume (PDF)");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);
      await API.post(`/applications/apply/${jobId}`, formData);
      toast.success("Application submitted successfully 🎉");
      navigate("/my-applications");
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
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
          onChange={(e) => setResume(e.target.files[0])}
          className="mb-4"
        />

        <button
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
