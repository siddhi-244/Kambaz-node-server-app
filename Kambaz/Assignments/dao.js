import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = async (courseId) => {
    return await model.find({ course: courseId });
  };

  const findAssignmentById = async (assignmentId) => {
    return await model.findById(assignmentId);
  };

  const createAssignment = async (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return await model.create(newAssignment);
  };

  const updateAssignment = async (assignmentId, assignmentUpdates) => {
    const { _id, ...updates } = assignmentUpdates;
    await model.updateOne({ _id: assignmentId }, { $set: updates });
    return await model.findById(assignmentId);
  };

  const deleteAssignment = async (assignmentId) => {
    return await model.deleteOne({ _id: assignmentId });
  };

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}