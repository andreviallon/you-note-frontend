import { Component, ViewEncapsulation } from '@angular/core';
import { Note } from 'src/app/note.model';
import { mockNotes } from '../note-mock-data';

@Component({
  selector: 'app-notes-list',
  template: `
    <div id="app-notes-list">
      <p class="text-base font-medium mb-0">Add Note</p>
      <div class="w-full mt-4 mb-10 flex flex-col">
        <mat-form-field appearance="fill">
          <mat-label>New note</mat-label>
          <input matInput />
        </mat-form-field>
        <button mat-flat-button color="primary">Add</button>
      </div>

      <p class="text-base font-medium">Your Notes</p>
      <mat-selection-list [multiple]="false">
        <mat-list-option *ngFor="let note of notes" [value]="note">
          <div class="flex justify-between items-center">
            {{ note.title }}
            <mat-icon>clear</mat-icon>
          </div>
          <mat-divider></mat-divider>
        </mat-list-option>
      </mat-selection-list>
    </div>
  `,
  styleUrls: ['./notes-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotesListComponent {
  public notes: Note[] = mockNotes;
}
