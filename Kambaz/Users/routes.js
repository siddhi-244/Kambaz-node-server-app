import UsersDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const createUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "FACULTY") {
      res.sendStatus(403);
      return;
    }
    const user = dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role !== "FACULTY") {
      res.sendStatus(403);
      return;
    }
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(204);
  };

  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };

  const findUsersForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = enrollmentsDao.findEnrollmentsForCourse(courseId);
    const userIds = enrollments.map((e) => e.user);
    const users = userIds.map((userId) => dao.findUserById(userId)).filter(Boolean);
    res.json(users);
  };

  const updateUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = req.params.userId;
    const userUpdates = req.body;

    // Users can update their own profile, or faculty can update anyone
    if (currentUser._id !== userId && currentUser.role !== "FACULTY") {
      res.sendStatus(403);
      return;
    }

    dao.updateUser(userId, userUpdates);
    const updatedUser = dao.findUserById(userId);
    
    // Update session if user updated their own profile
    if (currentUser._id === userId) {
      req.session["currentUser"] = updatedUser;
    }
    
    res.json(updatedUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}