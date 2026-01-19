import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Briefcase } from "lucide-react";
import toast from "react-hot-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await API.get("/jobs/user");
    setJobs(res.data);
  };

  // ✅ FIX: function must be OUTSIDE JSX
  const handleViewDetails = (job) => {
    if (job.appliedStatus) {
      let message = "";

      if (job.appliedStatus === "pending") {
        message = "You have already applied for this job. Status: Pending.";
      } else if (job.appliedStatus === "shortlisted") {
        message = "🎉 You are shortlisted for this job!";
      } else if (job.appliedStatus === "rejected") {
        message = "❌ Your application was rejected for this job.";
      }

      toast(message);
      return;
    }

    navigate(`/jobs/${job._id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border rounded-xl p-5 shadow"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>

            <div className="flex gap-4 mt-3 text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee size={16} /> {job.salary}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={16} /> {job.jobType}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-5">
              {/* VIEW DETAILS */}
              <button
                onClick={() => handleViewDetails(job)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                View Details
              </button>

              {/* APPLY / STATUS */}
              {job.appliedStatus === null ? (
                <button
                  onClick={() => navigate(`/apply/${job._id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Apply
                </button>
              ) : (
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    job.appliedStatus === "rejected"
                      ? "bg-red-100 text-red-700"
                      : job.appliedStatus === "shortlisted"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {job.appliedStatus.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
