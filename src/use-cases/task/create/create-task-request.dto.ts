import { User } from "../../../entities/User";
import { TaskResponse } from "../task-response";

export interface CreateTaskRequestDTO {
  name: string;
  description: string;
  ownerId: string;
  parentId?: string;
}
