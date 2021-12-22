import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Note } from 'src/app/note.model';
import { environment } from 'src/environments/environment';
import {
  CreateNote,
  DeleteNote,
  GetUserNotes,
  SelectNote,
  UpdateNote,
} from './note.action';

const URL = environment.apiUrl;
const TOKEN = localStorage.getItem('user.token');

let headers = new HttpHeaders().set('Content-Type', 'application/json');
if (TOKEN) {
  headers = headers.append('Authorization', `Bearer ${JSON.parse(TOKEN)}`);
}

export class NoteStateModel {
  notes: Note[] | undefined;
  selectedNoteId: string | undefined;
  errorMessage: string | undefined;
}

@State<NoteStateModel>({
  name: 'note',
  defaults: {
    notes: undefined,
    selectedNoteId: undefined,
    errorMessage: undefined,
  },
})
@Injectable()
export class NoteState {
  @Selector()
  static notes(state: NoteStateModel): Note[] | undefined {
    return state.notes;
  }

  @Selector()
  static selectedNote(state: NoteStateModel): Note | undefined {
    return state.notes?.find((note) => note.id === state.selectedNoteId);
  }

  @Selector()
  static errorMessage(state: NoteStateModel): string | undefined {
    return state.errorMessage;
  }

  constructor(private http: HttpClient) {}

  @Action(SelectNote)
  selectNote(
    { patchState }: StateContext<NoteStateModel>,
    { noteId }: SelectNote
  ) {
    patchState({ selectedNoteId: noteId });
  }

  @Action(GetUserNotes)
  async getUserNotes(
    { patchState }: StateContext<NoteStateModel>,
    {}: GetUserNotes
  ) {
    this.http.get(`${URL}/notes`, { headers }).subscribe({
      next: (res) => {
        const notes = res as Note[];
        patchState({ notes });
      },
      error: (error) => {
        patchState({ errorMessage: error.error.message });
      },
    });
  }

  @Action(CreateNote)
  async createNote(
    { patchState, getState }: StateContext<NoteStateModel>,
    { title }: CreateNote
  ) {
    this.http.post(`${URL}/notes`, { title }, { headers }).subscribe({
      next: (res) => {
        const resNote = res as Note;
        const currentNotes = getState().notes;
        let newNotes: Note[] = [];

        if (currentNotes) {
          newNotes = [...currentNotes, resNote];
        } else {
          newNotes = [resNote];
        }

        patchState({ notes: newNotes, selectedNoteId: resNote.id });
      },
      error: (error) => {
        patchState({ errorMessage: error.error.message });
      },
    });
  }

  @Action(UpdateNote)
  async updateNote(
    { patchState, getState }: StateContext<NoteStateModel>,
    { note }: UpdateNote
  ) {
    this.http
      .patch(
        `${URL}/notes/${note.id}`,
        { title: note.title, videoLink: note.videoLink, content: note.content },
        { headers }
      )
      .subscribe({
        next: (res) => {
          const resNote = res as Note;
          const notes = getState().notes;
          const foundIndex = notes?.findIndex((n) => n.id == resNote.id);

          if (notes && foundIndex) {
            notes[foundIndex] = resNote;
            patchState({ notes: notes });
          }
        },
        error: (error) => {
          patchState({ errorMessage: error.error.message });
        },
      });
  }

  @Action(DeleteNote)
  async deleteNote(
    { patchState, getState }: StateContext<NoteStateModel>,
    { noteId }: DeleteNote
  ) {
    this.http.delete(`${URL}/notes/${noteId}`, { headers }).subscribe({
      next: () => {
        const newNotes = getState().notes?.filter((note) => note.id !== noteId);
        patchState({ notes: newNotes });
      },
      error: (error) => {
        patchState({ errorMessage: error.error.message });
      },
    });
  }
}
