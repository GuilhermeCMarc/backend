import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class FindUserByEmailUseCase implements IUseCase<string, User> {
  private repository: Repository<User>;

  async execute(email?: string): Promise<IUseCaseReturn<User>> {
    this.repository = await getRepository(User);

    const userFound = await this.repository.findOne({ email: email });

    if (!userFound)
      return {
        data: null,
        error: ApiError.noContent("no user was found with this email"),
      };

    return { data: userFound, error: null };
  }
}
