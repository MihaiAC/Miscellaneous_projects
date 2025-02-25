export default class Project {
  constructor(name, description, date) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.date = date;
    this.tasks = new Map();
  }

  addTask(task) {
    if (!task) {
      throw new Error("Task must have an id.");
    }

    this.tasks.set(task.id, task);
  }

  removeTask(taskId) {
    this.tasks.delete(taskId);
  }

  getTasks() {
    return Array.from(this.tasks.values());
  }
}
