import { genSalt, hash } from "bcrypt";
import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";
import { CreateUserRequestDTO } from "./create-user-request.dto";

export class CreateUserUseCase implements IUseCase<CreateUserRequestDTO, User> {
  private repository: Repository<User>;

  async execute(data?: CreateUserRequestDTO): Promise<IUseCaseReturn<User>> {
    this.repository = await getRepository(User);

    const sameEmail = await this.repository.findOne({ email: data.email });

    if (sameEmail)
      return {
        error: ApiError.badRequest("user already exists"),
      };

    const createdUser = await this.repository.create(data);

    if (!createdUser)
      return { error: ApiError.internal("Error while creating user") };

    try {
      const hashedPassword = await hash(createdUser.password, 10);
      createdUser.password = hashedPassword;
    } catch (error) {
      return { error: ApiError.internal(error) };
    }

    await this.repository.save(createdUser);

    return { data: createdUser };
  }
}
