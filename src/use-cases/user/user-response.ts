import { Task } from "../../entities/Task";
import { User } from "../../entities/User";

// This class creates an user response, filtering sensible data
export class UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
