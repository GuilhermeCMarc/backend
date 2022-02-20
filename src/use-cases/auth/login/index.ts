import { LoginController } from "./login.controller";
import { LoginUseCase } from "./login.use-case";

const loginUseCase = new LoginUseCase();
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
