import { getRepository, Repository } from "typeorm";
import { Task } from "../../../entities/Task";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";
import { UpdateTaskRequestDTO } from "./update-task-request.dto";

export class UpdateTaskUseCase implements IUseCase<UpdateTaskRequestDTO, Task> {
  private repository: Repository<Task>;

  async execute({
    id,
    name,
    description,
    isDone,
  }: UpdateTaskRequestDTO): Promise<IUseCaseReturn<Task>> {
    this.repository = await getRepository(Task);

    const foundTask = await this.repository.findOne({ id });

    if (!foundTask)
      return { error: ApiError.notFound("no task was found with this id") };

    name ? (foundTask.name = name) : "";
    description ? (foundTask.description = description) : "";
    isDone ? (foundTask.isDone = isDone) : "";

    const saved = await this.repository.save(foundTask);

    return { data: saved };
  }
}
