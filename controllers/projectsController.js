const Project = require("../models/projectsModel");
const mongoose = require("mongoose");

// add project to db
const addProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = await Project.create({ title, description });
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all projects from db
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      visible: true,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user assign project to their self
const assignProject = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    // Validate if the IDs are in the correct format
    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    // Convert projectId and userId to ObjectId
    const projectObjectId = new mongoose.Types.ObjectId(projectId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const updatedProject = await Project.findByIdAndUpdate(
      projectObjectId,
      { assignedTo: userObjectId, visible: false },
      { new: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//getting all assign projects for specific user
const getAssignProjects = async (req, res) => {
  try {
    const assignedProjects = await Project.find({ assignedTo: req.user._id }).populate(
      'assignedTo'
    );
    res.json(assignedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//cancel project after assigning
const cancelProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Convert projectId and userId to ObjectId
    const project = await Project.findById(projectId);
    if (!project.canceledBy.includes(req.user._id)) {
      project.canceledBy.push(req.user._id);
      project.visible = true;
      await project.save();
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addProject,
  getAllProjects,
  assignProject,
  cancelProject,
  getAllProjects,
  getAssignProjects
};
