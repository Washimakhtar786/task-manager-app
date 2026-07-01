import User from "./user.domain.js";
import Task from "./task.domain.js";

User.hasMany(Task, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { User, Task };