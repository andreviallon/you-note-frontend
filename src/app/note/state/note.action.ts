import { Note } from 'src/app/note.model';

export class SelectNote {
  static readonly type = '[Note] select note';

  constructor(public noteId: string) {}
}

export class GetUserNotes {
  static readonly type = '[Note] get user notes';
}

export class CreateNote {
  static readonly type = '[Note] create note';

  constructor(public title: string) {}
}

export class UpdateNote {
  static readonly type = '[Note] update note';

  constructor(public note: Note) {}
}

export class DeleteNote {
  static readonly type = '[Note] delete note';

  constructor(public noteId: string) {}
}
