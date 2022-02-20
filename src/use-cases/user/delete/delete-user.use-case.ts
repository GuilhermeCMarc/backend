import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";

export class DeleteUserUseCase implements IUseCase<string, void> {
  private repository: Repository<User>;

  async execute(id: string): Promise<IUseCaseReturn<void>> {
    this.repository = await getRepository(User);

    const userToDelete = await this.repository.findOne({ id });

    if (!userToDelete)
      return {
        data: null,
        error: ApiError.notFound("no user was found with this id"),
      };

    await this.repository.delete({ id });

    return {};
  }
}
