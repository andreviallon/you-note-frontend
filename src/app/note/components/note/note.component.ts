import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-note',
  template: `
    <div id="app-note">
      <form
        [formGroup]="noteForm"
        class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full"
      >
        <mat-card class="col-span-1	w-full h-full">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Youtube Link</mat-label>
            <input matInput formControlName="videoLink" />
          </mat-form-field>
          <div class="video_wrapper" *ngIf="safeSrc">
            <iframe
              [src]="safeSrc"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </mat-card>

        <mat-card class="col-span-1	w-full h-full">
          <div class="flex flex-col justify-between h-full">
            <div class="pb-4 h-full flex justify-between items-center flex-col">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Title</mat-label>
                <input matInput formControlName="title" />
              </mat-form-field>
              <quill-editor
                [modules]="modules"
                formControlName="content"
              ></quill-editor>
            </div>
            <div class="flex gap-4 justify-end">
              <button mat-stroked-button (click)="discardChanges()">
                Cancel
              </button>
              <button mat-flat-button color="primary" (click)="save()">
                Save
              </button>
            </div>
          </div>
        </mat-card>
      </form>
    </div>
  `,
  styleUrls: ['./note.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteComponent implements OnInit {
  @Input() note!: Note;
  @Output() updateNote: EventEmitter<Note> = new EventEmitter<Note>();

  public noteForm!: FormGroup;
  public safeSrc: SafeResourceUrl | undefined;
  public modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ header: 1 }, { header: 2 }],
      ['blockquote', 'code-block', { script: 'super' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      videoLink: [this.note.videoLink],
      title: [this.note.title],
      content: [this.note.content],
    });

    this.safeSrc = this.note.videoLink && this.setSafeSrc(this.note.videoLink);

    this.noteForm.get('videoLink')!.valueChanges.subscribe((link) => {
      this.safeSrc = link ? this.setSafeSrc(link) : undefined;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.noteForm) {
      this.noteForm.setValue({
        videoLink: this.note.videoLink
          ? this.convertLink(this.note.videoLink)
          : '',
        title: this.note.title,
        content: this.note.content,
      });
    }
  }

  public setSafeSrc(link: string): SafeResourceUrl | undefined {
    if (!link.includes('https:')) return undefined;

    const convertedLink = this.convertLink(link);
    return this.sanitizeLink(convertedLink);
  }

  public sanitizeLink(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  public convertLink(link: string): string {
    return link.split('watch?v=').join('embed/');
  }

  public discardChanges(): void {
    this.noteForm.setValue({
      videoLink: this.note.videoLink,
      title: this.note.title,
      content: this.note.content,
    });
  }

  public save(): void {
    const note: Note = {
      id: this.note.id,
      title: this.noteForm.value.title,
      videoLink: this.noteForm.value.videoLink,
      content: this.noteForm.value.content,
    };

    this.updateNote.emit(note);
  }
}
