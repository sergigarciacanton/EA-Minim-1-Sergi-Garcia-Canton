export class User {
  _id?: number;
  name: string;
  age: string;
  password: string;
  creationDate: Date;

  constructor(name: string, age: string, password: string, creationDate: Date) {
    this.name = name;
    this.age = age;
    this.password = password;
    this.creationDate = creationDate;
  }
}
