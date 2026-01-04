import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await API.get(`/applications/job/${jobId}`);
    setApplications(res.data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}/status`, { status });
    setApplications(prev =>
      prev.map(app =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      {applications.map(app => (
        <div key={app._id} className="border p-4 mb-4 rounded bg-white shadow">
          <p className="font-semibold">
            {app.applicant.name} ({app.applicant.email})
          </p>

          <p>Status: <b>{app.status}</b></p>

          {/* ✅ VIEW RESUME */}
          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            View Resume (PDF)
          </a>

          <div className="mt-3 space-x-2">
            <button
              onClick={() => updateStatus(app._id, "shortlisted")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Shortlist
            </button>

            <button
              onClick={() => updateStatus(app._id, "rejected")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobApplications;
