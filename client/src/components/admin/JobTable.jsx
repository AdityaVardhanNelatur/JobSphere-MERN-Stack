import { Eye, Pencil, XCircle, Trash2, Plus } from "lucide-react";
import { closeJob, deleteJob } from "../../services/jobService";
import { useNavigate } from "react-router-dom";

const JobTable = ({ jobs, onCreate, onEdit, refresh }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Manage Jobs</h2>
        <button onClick={onCreate} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded ease-in-out cursor-pointer ">
          <Plus size={18} /> Create Job
        </button>
      </div>

      {jobs.map(job => (
        <div key={job._id} className="flex justify-between items-center border-b py-3">
          <div>
            <h4 className="font-semibold">{job.title}</h4>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>

          <div className="flex gap-4">
            <Eye onClick={() => navigate(`/admin/job/${job._id}`)} className="cursor-pointer text-blue-600" />
            <Pencil onClick={() => onEdit(job)} className="cursor-pointer text-green-600" />
            {job.status === "open" && <XCircle onClick={() => closeJob(job._id).then(refresh)} className="cursor-pointer text-orange-600" />}
            <Trash2 onClick={() => deleteJob(job._id).then(refresh)} className="cursor-pointer text-red-600" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobTable;
