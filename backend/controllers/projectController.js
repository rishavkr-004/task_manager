const Project = require("../models/Project");


// 🟢 Create Project (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description, teamMembers } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      teamMembers,
      createdBy: req.user.id
    });

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🟢 Get Projects (Role-based)
exports.getProjects = async (req, res) => {
  try {
    let query = {};

    // 🔐 Member → only projects they belong to
    if (req.user.role === "member") {
      query = {
        $or: [
          { teamMembers: req.user.id },
          { createdBy: req.user.id }
        ]
      };
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✏️ Update Project (Admin only)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🗑️ Delete Project (Admin only)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({ msg: "Project deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};