import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
  await API.put(`/applications/${id}/status`, { status });

  setApplications(prev =>
    prev.map(app =>
      app._id === id ? { ...app, status } : app
    )
  );

  if (status === "shortlisted") {
    toast.success("Candidate shortlisted 🎉");
  } else {
    toast.error("Candidate rejected ❌");
  }
};


  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      {applications.length === 0 && (
        <p>No applications for this job.</p>
      )}

      {applications.map(app => (
        <div
          key={app._id}
          className="border p-4 mb-4 rounded bg-white shadow"
        >
          <p className="font-semibold">
            {app.applicant.name} ({app.applicant.email})
          </p>

          <p className="mt-1">
            Status:{" "}
            <span className="font-bold uppercase">
              {app.status}
            </span>
          </p>

          {/* ✅ VIEW RESUME */}
          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            View Resume (PDF)
          </a>

          {/* ACTION BUTTONS */}
          <div className="mt-3 space-x-2">
            <button
              onClick={() =>
                updateStatus(app._id, "shortlisted", app.applicant.name)
              }
              disabled={app.status !== "pending"}
              className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Shortlist
            </button>

            <button
              onClick={() =>
                updateStatus(app._id, "rejected", app.applicant.name)
              }
              disabled={app.status !== "pending"}
              className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
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
