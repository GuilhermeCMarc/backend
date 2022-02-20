import { getRepository, Repository } from "typeorm";
import { Task } from "../../../entities/Task";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class FindTasksByParendIdUseCase implements IUseCase<string, Task[]> {
  private taskRepo: Repository<Task>;

  async execute(id: string): Promise<IUseCaseReturn<Task[]>> {
    this.taskRepo = await getRepository(Task);

    const foundParent = await this.taskRepo.findOne(
      { id },
      { relations: ["subTasks"] }
    );

    if (!foundParent)
      return {
        error: ApiError.notFound("no parent task was found with this id"),
      };

    return { data: foundParent.subTasks };
  }
}
