import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/model/user';
import { Logout } from 'src/app/auth/state/user.action';
import { UserState } from 'src/app/auth/state/user.state';
import { Note } from 'src/app/note.model';
import { mockNotes } from '../../note-mock-data';
import {
  CreateNote,
  DeleteNote,
  GetUserNotes,
  SelectNote,
  UpdateNote,
} from '../../state/note.action';
import { NoteState } from '../../state/note.state';

@Component({
  selector: 'app-note-page',
  template: `
    <mat-drawer-container class="h-full bg-white" autosize>
      <mat-drawer #drawer mode="side" opened="true">
        <app-sidebar
          [notes]="notes$ | async"
          [user]="user$ | async"
          (selectNote)="selectNote($event)"
          (createNote)="createNote($event)"
          (deleteNote)="deleteNote($event)"
          (logout)="logout()"
        ></app-sidebar>
      </mat-drawer>

      <div class="flex flex-col justify-between w-full h-full min-h-full">
        <app-header (toggleMenu)="drawer.toggle()"></app-header>
        <div class="h-full drawer p-4 container mx-auto">
          <ng-container *ngIf="selectedNote$ | async as selectedNote">
            <app-note
              [note]="selectedNote"
              (updateNote)="updateNote($event)"
            ></app-note>
          </ng-container>
        </div>
      </div>
    </mat-drawer-container>
  `,
  styleUrls: ['./note-page.component.scss'],
})
export class NotePageComponent {
  @Select(UserState.user) user$!: Observable<User>;
  @Select(NoteState.notes) notes$!: Observable<Note[]>;
  @Select(NoteState.selectedNote) selectedNote$!: Observable<Note | undefined>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.getNotes();
  }

  public selectNote(noteId: string): void {
    this.store.dispatch(new SelectNote(noteId));
  }

  public getNotes(): void {
    this.store.dispatch(new GetUserNotes());
  }

  public createNote(title: string): void {
    this.store.dispatch(new CreateNote(title));
  }

  public updateNote(note: Note): void {
    this.store.dispatch(new UpdateNote(note));
  }

  public deleteNote(noteId: string): void {
    this.store.dispatch(new DeleteNote(noteId));
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public showSideBar = true;
  public note = mockNotes[0];
}
