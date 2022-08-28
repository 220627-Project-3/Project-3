export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;

  constructor(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
