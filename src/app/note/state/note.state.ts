import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Note } from 'src/app/note.model';
import { SetError } from 'src/app/state/error.action';
import { environment } from 'src/environments/environment';
import {
  CreateNote,
  DeleteNote,
  GetUserNotes,
  SelectNote,
  UpdateNote,
} from './note.action';

const URL = environment.apiUrl;

export class NoteStateModel {
  notes: Note[] | undefined;
  selectedNoteId: string | undefined;
  isLoading: boolean = false;
}

@State<NoteStateModel>({
  name: 'note',
  defaults: {
    notes: undefined,
    selectedNoteId: undefined,
    isLoading: false,
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
  static isLoading(state: NoteStateModel): boolean {
    console.log('state.isLoading', state.isLoading);

    return state.isLoading;
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
    { patchState, dispatch }: StateContext<NoteStateModel>,
    {}: GetUserNotes
  ) {
    patchState({ isLoading: true });
    this.http.get(`${URL}/notes`).subscribe({
      next: (res) => {
        const notes = res as Note[];
        patchState({ notes, isLoading: false });
      },
      error: (error) => {
        dispatch(new SetError(error.error.message));
        patchState({ isLoading: false });
      },
    });
  }

  @Action(CreateNote)
  async createNote(
    { patchState, getState, dispatch }: StateContext<NoteStateModel>,
    { title }: CreateNote
  ) {
    patchState({ isLoading: true });
    this.http.post(`${URL}/notes`, { title }).subscribe({
      next: (res) => {
        const resNote = res as Note;
        const currentNotes = getState().notes;
        let newNotes: Note[] = [];

        if (currentNotes) {
          newNotes = [...currentNotes, resNote];
        } else {
          newNotes = [resNote];
        }

        patchState({
          notes: newNotes,
          selectedNoteId: resNote.id,
          isLoading: false,
        });
      },
      error: (error) => {
        dispatch(new SetError(error.error.message));
        patchState({ isLoading: false });
      },
    });
  }

  @Action(UpdateNote)
  async updateNote(
    { patchState, getState, dispatch }: StateContext<NoteStateModel>,
    { note }: UpdateNote
  ) {
    patchState({ isLoading: true });
    this.http
      .patch(`${URL}/notes/${note.id}`, {
        title: note.title,
        videoLink: note.videoLink,
        content: note.content,
      })
      .subscribe({
        next: (res) => {
          const resNote = res as Note;
          const notes = getState().notes;
          const foundIndex = notes?.findIndex((n) => n.id == resNote.id);

          if (notes && foundIndex) {
            notes[foundIndex] = resNote;
            patchState({ notes: notes, isLoading: false });
          }
        },
        error: (error) => {
          dispatch(new SetError('Something went wrong :('));
          patchState({ isLoading: false });
        },
      });
  }

  @Action(DeleteNote)
  async deleteNote(
    { patchState, getState, dispatch }: StateContext<NoteStateModel>,
    { noteId }: DeleteNote
  ) {
    this.http.delete(`${URL}/notes/${noteId}`).subscribe({
      next: () => {
        const newNotes = getState().notes?.filter((note) => note.id !== noteId);
        patchState({ notes: newNotes, isLoading: false });
      },
      error: (error) => {
        dispatch(new SetError(error.error.message));
        patchState({ isLoading: false });
      },
    });
  }
}
