export class SetError {
  static readonly type = '[Error] set error';

  constructor(public message: string) {}
}

export class ClearError {
  static readonly type = '[Error] clear error';
}
