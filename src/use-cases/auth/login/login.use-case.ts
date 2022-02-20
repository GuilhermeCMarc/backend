import { compare } from "bcrypt";
import { getRepository, Repository } from "typeorm";
import { User } from "../../../entities/User";
import { ApiError } from "../../../utils/api-error";
import { IUseCase, IUseCaseReturn } from "../../../utils/use-case-interface";
import { LoginRequestDTO } from "./login-request.dto";
import { LoginResponseDTO } from "./login-response.dto";
import jwt from "jsonwebtoken";

export class LoginUseCase
  implements IUseCase<LoginRequestDTO, { user: User; jwtToken: string }>
{
  private repository: Repository<User>;

  async execute({
    email,
    password,
  }: LoginRequestDTO): Promise<
    IUseCaseReturn<{ user: User; jwtToken: string }>
  > {
    this.repository = await getRepository(User);

    const userFound = await this.repository.findOne({ email });

    if (!userFound) return { error: ApiError.notFound("user does not exist") };

    const matchesPassword = await compare(password, userFound.password);

    if (!matchesPassword)
      return { error: ApiError.notAuthorized("wrong password") };

    const payload = {
      id: userFound.id,
      email,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
    };

    const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_DAYS + " days",
    });

    return { data: { user: userFound, jwtToken } };
  }
}
