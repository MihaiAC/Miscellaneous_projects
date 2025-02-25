export default class Task {
  constructor(name) {
    this.name = name;
    this.id = crypto.randomUUID();
  }
}
