import { getRepository, Repository } from "typeorm";
import { Task } from "../../../entities/Task";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class FindTasksByUserIDUseCase implements IUseCase<string, Task[]> {
  private taskRepo: Repository<Task>;

  async execute(id: string): Promise<IUseCaseReturn<Task[]>> {
    this.taskRepo = await getRepository(Task);

    const tasks = await this.taskRepo
      .createQueryBuilder("task")
      .leftJoinAndSelect("task.owner", "owner")
      .leftJoinAndSelect("task.parent", "parent")
      .where("owner.id = :ownerId", { ownerId: id })
      .andWhere("parent IS NULL") // get only root level tasks
      .getMany();

    return { data: tasks };
  }
}
