import { UserCredentials } from '../model/user-credentials';

export class Signup {
  static readonly type = '[User] Signup';

  constructor(public userCredentials: UserCredentials) {}
}

export class Login {
  static readonly type = '[User] login';

  constructor(public userCredentials: UserCredentials) {}
}

export class Logout {
  static readonly type = '[User] logout';
}
