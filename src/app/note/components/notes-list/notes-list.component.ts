import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-notes-list',
  template: `
    <div id="app-notes-list">
      <p class="text-base font-medium mb-0">Add Note</p>
      <form [formGroup]="addNoteForm">
        <div class="w-full mt-4 mb-10 flex flex-col">
          <mat-form-field appearance="fill">
            <mat-label>New note</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>
          <button mat-flat-button color="primary" (click)="submit()">
            Add
          </button>
        </div>
      </form>

      <p class="text-base font-medium">Your Notes</p>
      <mat-selection-list [multiple]="false" *ngIf="notes">
        <mat-list-option *ngFor="let note of notes" [value]="note">
          <div
            class="flex justify-between items-center"
            (click)="selectNote.emit(note.id)"
          >
            {{ note.title }}
            <button
              mat-icon-button
              color="accent"
              class="flex justify-center items-center"
              (click)="deleteNote.emit(note.id)"
            >
              <mat-icon class="text-lg">delete</mat-icon>
            </button>
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
  @Input() notes!: Note[] | null;

  @Output() selectNote: EventEmitter<string> = new EventEmitter();
  @Output() createNote: EventEmitter<string> = new EventEmitter();
  @Output() deleteNote: EventEmitter<string> = new EventEmitter();

  public addNoteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.addNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  public submit(): void {
    this.createNote.emit(this.addNoteForm.get('title')?.value);
  }
}
