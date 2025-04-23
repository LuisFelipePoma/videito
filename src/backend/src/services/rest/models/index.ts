import { User } from "./User";
import { Course } from "./Course";
import { CourseUser } from "./CourseUser";
import { Class } from "./Class";
import { ClassUser } from "./ClassUser";
import { MonitoringRecord } from "./MonitoringRecord";
import { ClassRecording } from "./ClassRecording";
import { ClassReport } from "./ClassReport";

// Relaciones
User.hasMany(Course, { foreignKey: "users_id" });
Course.belongsTo(User, { foreignKey: "users_id" });

User.belongsToMany(Course, { through: CourseUser, foreignKey: "users_id" });
Course.belongsToMany(User, { through: CourseUser, foreignKey: "courses_id" });

Course.hasMany(Class, { foreignKey: "courses_id" });
Class.belongsTo(Course, { foreignKey: "courses_id" });

User.belongsToMany(Class, { through: ClassUser, foreignKey: "users_id" });
Class.belongsToMany(User, { through: ClassUser, foreignKey: "classes_id" });

Class.hasMany(MonitoringRecord, { foreignKey: "classes_id" });
User.hasMany(MonitoringRecord, { foreignKey: "users_id" });

Class.hasMany(ClassRecording, { foreignKey: "classes_id" });
Class.hasMany(ClassReport, { foreignKey: "classes_id" });

export {
  User,
  Course,
  CourseUser,
  Class,
  ClassUser,
  MonitoringRecord,
  ClassRecording,
  ClassReport,
};
