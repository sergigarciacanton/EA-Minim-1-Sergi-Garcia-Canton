import { User } from './user';

export class Denuncia {
  _id?: string;
  name: string;
  delito: string;
  userDenunciat: User;
  creationDate: Date;

  constructor(
    _id: string,
    name: string,
    delito: string,
    userDenunciat: User,
    creationDate: Date
  ) {
    this._id = _id;
    this.name = name;
    this.delito = delito;
    this.userDenunciat = userDenunciat;
    this.creationDate = creationDate;
  }
}
