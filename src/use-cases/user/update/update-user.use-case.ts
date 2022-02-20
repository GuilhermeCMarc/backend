import { compare } from "bcrypt";
import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";
import { UpdateUserRequestDTO } from "./update-user-request.dto";

export class UpdateUserUseCase implements IUseCase<UpdateUserRequestDTO, User> {
  private repository: Repository<User>;

  async execute({
    id,
    firstName,
    lastName,
    email,
    password,
  }: UpdateUserRequestDTO): Promise<IUseCaseReturn<User>> {
    this.repository = await getRepository(User);

    const userToUpdate = await this.repository.findOne({ id });

    if (!userToUpdate)
      return {
        data: null,
        error: ApiError.notFound("no user was found with this id"),
      };

    const matchesPassword = await compare(password, userToUpdate.password);

    if (!matchesPassword)
      return {
        data: null,
        error: ApiError.notAuthorized("this password was invalid"),
      };

    const updatedUser = await this.repository.update(
      {
        id,
      },
      { firstName, lastName }
    );

    if (!updatedUser.affected)
      return {
        data: null,
        error: ApiError.internal(
          "no user was updated: error while updating user"
        ),
      };

    return {};
  }
}
