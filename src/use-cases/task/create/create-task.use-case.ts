import { getRepository, Repository } from "typeorm";
import { Task } from "../../../entities/Task";
import { User } from "../../../entities/User";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";
import { TaskResponse } from "../task-response";
import { CreateTaskRequestDTO } from "./create-task-request.dto";

export class CreateTaskUseCase implements IUseCase<CreateTaskRequestDTO, Task> {
  private userRepo: Repository<User>;
  private taskRepo: Repository<Task>;

  async execute({
    name,
    description,
    ownerId,
    parentId,
  }: CreateTaskRequestDTO): Promise<IUseCaseReturn<Task>> {
    this.taskRepo = await getRepository(Task);
    this.userRepo = await getRepository(User);

    const foundUser = await this.userRepo.findOne(
      { id: ownerId },
      { relations: ["tasks"] }
    );

    if (!foundUser)
      return { error: ApiError.notFound("owner user was not found") };

    const newTask = await this.taskRepo.create({ name, description });

    newTask.owner = foundUser;

    if (parentId) {
      const parentTask = await this.taskRepo.findOne(
        { id: parentId },
        { relations: ["subTasks"] }
      );

      if (!parentTask)
        return { error: ApiError.notFound("parent task was not found") };

      if (parentTask.subTasks === undefined) parentTask.subTasks = [newTask];
      else parentTask.subTasks.push(newTask);

      newTask.parent = parentTask;

      await this.taskRepo.save(parentTask);
    }

    await this.taskRepo.save(newTask);

    if (foundUser.tasks === undefined) foundUser.tasks = [newTask];
    else foundUser.tasks.push(newTask);

    await this.userRepo.save(foundUser);

    return { data: newTask };
  }
}
