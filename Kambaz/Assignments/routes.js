import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();

  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { aid } = req.params;
    const assignment = await dao.findAssignmentById(aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  const createAssignment = async (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
    };
    const assignment = await dao.createAssignment(newAssignment);
    res.json(assignment);
  };

  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const assignment = await dao.updateAssignment(aid, req.body);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    await dao.deleteAssignment(aid);
    res.sendStatus(204);
  };

  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}