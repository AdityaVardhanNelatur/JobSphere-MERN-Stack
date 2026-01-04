import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

/* =========================
 APPLY FOR JOB (USER)
========================= */
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.status === "closed") {
      return res.status(400).json({ message: "Job applications are closed" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume (PDF) is required" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: req.file.path
    });

    const user = await User.findById(userId);
    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "Job Application Submitted",
        html: `<p>You applied for <b>${job.title}</b> at <b>${job.company}</b></p>`
      });
    }

    res.status(201).json({ message: "Applied successfully", application });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
 UPDATE STATUS (ADMIN)
========================= */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(applicationId)
      .populate("applicant", "name email")
      .populate("job", "title company");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    if (application.applicant?.email) {
      await sendEmail({
        to: application.applicant.email,
        subject: `Application ${status.toUpperCase()}`,
        html: `<p>Your application for <b>${application.job.title}</b> was ${status}</p>`
      });
    }

    res.json({ message: "Status updated", application });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
 GET APPLICATIONS BY JOB (ADMIN)
========================= */
export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("applicant", "name email")
      .populate("job", "title company");

    const result = applications.map(app => ({
      ...app._doc,
      resumeUrl: `${req.protocol}://${req.get("host")}/${app.resume}`
    }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* =========================
 GET MY APPLICATIONS (USER)
========================= */
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id
    }).populate("job", "title company");

    const result = applications.map(app => ({
      ...app._doc,
      resumeUrl: `${req.protocol}://${req.get("host")}/${app.resume}`
    }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
