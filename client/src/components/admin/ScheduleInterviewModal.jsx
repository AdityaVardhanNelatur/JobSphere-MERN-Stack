import { useState } from "react";
import API from "../../services/api";

const ScheduleInterviewModal = ({ applicationId, close, refresh }) => {
  const [form, setForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    location: ""
  });

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================= VALIDATIONS =================
    if (!form.date || !form.time || !form.location) {
      alert("Please fill all interview details");
      return;
    }

    const selectedDate = new Date(form.date);
    const now = new Date();

    // ❌ Past date check
    if (selectedDate < new Date(today)) {
      alert("Interview date cannot be in the past");
      return;
    }

    // ❌ Past time check (only if today)
    if (form.date === today) {
      const [h, m] = form.time.split(":");
      const interviewTime = new Date();
      interviewTime.setHours(h, m, 0, 0);

      if (interviewTime < now) {
        alert("Interview time must be in the future");
        return;
      }
    }

    // ================= API CALL =================
    try {
      await API.put(
        `/applications/${applicationId}/interview`,
        form
      );

      refresh();
      close();
    } catch (err) {
      console.error(err);
      alert("Failed to schedule interview");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Schedule Interview
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* DATE */}
          <input
            type="date"
            required
            min={today}               // ✅ BLOCK PAST DATES
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          {/* TIME */}
          <input
            type="time"
            required
            className="w-full border p-2 rounded"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
          />

          {/* MODE */}
          <select
            className="w-full border p-2 rounded"
            value={form.mode}
            onChange={(e) =>
              setForm({ ...form, mode: e.target.value })
            }
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Meeting link / Location"
            className="w-full border p-2 rounded"
            required
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Schedule
            </button>

            <button
              type="button"
              onClick={close}
              className="flex-1 border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
