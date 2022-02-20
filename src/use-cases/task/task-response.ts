import { Task } from "../../entities/Task";

export class TaskResponse {
  id: string;
  name: string;
  description: string;
  isDone: boolean;

  constructor(task: Task) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.isDone = task.isDone;
  }
}
