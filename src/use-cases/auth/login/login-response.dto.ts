import { UserResponse } from "../../user/user-response";

export interface LoginResponseDTO extends UserResponse {
  jwtToken: string;
}
