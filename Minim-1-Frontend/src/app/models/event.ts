import { User } from './user';

export class Event {
  _id: string;
  name: string;
  description: string;
  admin: User;
  creationDate: Date;
  category: string;

  constructor(
    _id: string,
    name: string,
    description: string,
    admin: User,
    creationDate: Date,
    category: string
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.admin = admin;
    this.creationDate = creationDate;
    this.category = category;
  }
}
