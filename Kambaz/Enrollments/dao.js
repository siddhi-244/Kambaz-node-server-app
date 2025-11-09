import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const { enrollments } = db;

  const enrollUserInCourse = (userId, courseId) => {
    const existingEnrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (!existingEnrollment) {
      enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    const index = enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );
    if (index !== -1) {
      enrollments.splice(index, 1);
    }
  };

  const findEnrollmentsForUser = (userId) => {
    return enrollments.filter((e) => e.user === userId);
  };

  const findEnrollmentsForCourse = (courseId) => {
    return enrollments.filter((e) => e.course === courseId);
  };

  const isUserEnrolledInCourse = (userId, courseId) => {
    return enrollments.some((e) => e.user === userId && e.course === courseId);
  };

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    isUserEnrolledInCourse,
  };
}