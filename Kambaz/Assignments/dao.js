export default function AssignmentsDao(db) {
  const { assignments } = db;

  const findAssignmentsForCourse = (courseId) => {
    return assignments.filter((assignment) => assignment.course === courseId);
  };

  const findAssignmentById = (assignmentId) => {
    return assignments.find((assignment) => assignment._id === assignmentId);
  };

  const createAssignment = (assignment) => {
    assignments.push(assignment);
    return assignment;
  };

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index !== -1) {
      assignments[index] = { ...assignments[index], ...assignmentUpdates };
      return assignments[index];
    }
    return null;
  };

  const deleteAssignment = (assignmentId) => {
    const index = assignments.findIndex((a) => a._id === assignmentId);
    if (index !== -1) {
      assignments.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}