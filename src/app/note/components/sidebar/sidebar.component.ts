import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/auth/model/user';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="w-96 h-full p-4 flex flex-col justify-between">
      <app-notes-list
        [notes]="notes"
        (selectNote)="selectNote.emit($event)"
        (createNote)="createNote.emit($event)"
        (deleteNote)="deleteNote.emit($event)"
      ></app-notes-list>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">{{ user?.email }}</span>
        <button mat-stroked-button color="accent" (click)="logout.emit()">
          Logout
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() notes!: Note[] | null;
  @Input() user!: User | null;

  @Output() selectNote: EventEmitter<string> = new EventEmitter();
  @Output() createNote: EventEmitter<string> = new EventEmitter();
  @Output() deleteNote: EventEmitter<string> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
}
