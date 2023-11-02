
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visible: { type: Boolean, default: true },
  canceledBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;