import { v4 as uuidv4 } from "uuid";

export default function UsersDao(db) {
  const { users } = db;

  const findAllUsers = () => users;

  const findUserById = (userId) => {
    return users.find((user) => user._id === userId);
  };

  const findUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };

  const findUserByCredentials = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    users.push(newUser);
    return newUser;
  };

  const updateUser = (userId, userUpdates) => {
    const index = users.findIndex((user) => user._id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...userUpdates };
      return users[index];
    }
    return null;
  };

  const deleteUser = (userId) => {
    const index = users.findIndex((user) => user._id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    createUser,
    updateUser,
    deleteUser,
  };
}