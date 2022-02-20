import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class FindUserByIdUseCase implements IUseCase<string> {
  private repository: Repository<User>;

  async execute(userId: string): Promise<IUseCaseReturn<User>> {
    this.repository = await getRepository(User);

    const user = await this.repository.findOne({ id: userId });

    return { data: user };
  }
}
