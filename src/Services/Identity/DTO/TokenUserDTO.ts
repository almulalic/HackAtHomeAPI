import { User } from "../../../Models/Entities";

export class TokenUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  telephoneNumber: string;

  constructor(User: User) {
    this.id = User.id;
    this.firstName = User.firstName;
    this.lastName = User.lastName;
    this.email = User.email;
    this.role = User.role;
    this.telephoneNumber = User.telephoneNumber;
  }
}
