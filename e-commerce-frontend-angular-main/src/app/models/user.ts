export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  admin: boolean;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    admin: boolean
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.admin = admin;
  }
}
