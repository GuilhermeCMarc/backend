import { getRepository, Repository } from "typeorm";
import { Task } from "../../../entities/Task";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class FindallTasksUseCase implements IUseCase<null, Task[]> {
  private repo: Repository<Task>;

  async execute(): Promise<IUseCaseReturn<Task[]>> {
    this.repo = await getRepository(Task);

    const data = await this.repo.find();

    return { data };
  }
}
