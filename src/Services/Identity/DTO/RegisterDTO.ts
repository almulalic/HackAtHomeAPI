import { User } from "../../../Models/Entities";

export class RegisterDTO extends User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  telephoneNumber: string;
}
