import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note',
  template: `
    <form [formGroup]="noteForm">
      <mat-card>
        <mat-form-field
          appearance="fill"
          formControlName="videoLink"
          class="w-full"
        >
          <mat-label>Video Link</mat-label>
          <input matInput />
        </mat-form-field>
      </mat-card>
    </form>
  `,
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  public noteForm!: FormGroup;

  ngOnInit() {
    this.noteForm = new FormGroup({
      videoLink: new FormControl(''),
      content: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    console.log('videoLink', form.value.videoLink);
    console.log('content', form.value.content);
  }
}
