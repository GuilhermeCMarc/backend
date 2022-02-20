import { getRepository, Repository } from "typeorm";
import { Task } from "../../../entities/Task";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class DeleteTaskUseCase implements IUseCase<string, Task> {
  private repository: Repository<Task>;

  async execute(id?: string): Promise<IUseCaseReturn<Task>> {
    this.repository = await getRepository(Task);

    const taskFound = await this.repository.findOne({ id });

    if (!taskFound)
      return { error: ApiError.notFound("no task was found with this id") };

    await this.repository.delete({ id });

    return { data: taskFound };
  }
}
