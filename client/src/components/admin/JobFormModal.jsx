import { useState } from "react";
import { createJob, updateJob } from "../../services/jobService";

const JobFormModal = ({ job, close, refresh }) => {
  const [form, setForm] = useState({
    title: job?.title || "",
    description: job?.description || "",
    company: job?.company || "",
    location: job?.location || "",
    salary: job?.salary || "",
    jobType: job?.jobType || "Full-Time"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job) {
        await updateJob(job._id, form);
      } else {
        await createJob(form);
      }

      refresh();
      close();
    } catch (error) {
      console.error("Job save failed", error);
      alert("Failed to save job");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {job ? "Edit Job" : "Create Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Job Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />

          <select
            className="w-full border p-2 rounded"
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
          </select>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg ease-in-out cursor-pointer"
            >
              Save Job
            </button>

            <button
              type="button"
              onClick={close}
              className="flex-1 border py-2 rounded-lg ease-in-out cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;
