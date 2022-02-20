import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class FindAllUsersUseCase implements IUseCase<null, User[]> {
  private repository: Repository<User>;

  async execute(): Promise<IUseCaseReturn<User[]>> {
    this.repository = await getRepository(User);

    const data = await this.repository.find();

    return { data };
  }
}
