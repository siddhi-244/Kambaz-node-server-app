import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { cid } = req.params;
    const assignments = dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const findAssignmentById = (req, res) => {
    const { aid } = req.params;
    const assignment = dao.findAssignmentById(aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  const createAssignment = (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
    };
    const assignment = dao.createAssignment(newAssignment);
    res.json(assignment);
  };

  const updateAssignment = (req, res) => {
    const { aid } = req.params;
    const assignment = dao.updateAssignment(aid, req.body);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  const deleteAssignment = (req, res) => {
    const { aid } = req.params;
    const success = dao.deleteAssignment(aid);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}