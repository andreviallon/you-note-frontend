import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-note',
  template: `
    <form
      [formGroup]="noteForm"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full"
    >
      <mat-card class="col-span-1	w-full h-full">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Youtube Link</mat-label>
          <input matInput formControlName="videoLink" />
        </mat-form-field>
        <div class="video_wrapper">
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
          <div>
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" />
            </mat-form-field>
            <mat-form-field appearance="outline" class="w-full">
              <textarea matInput formControlName="content"></textarea>
            </mat-form-field>
          </div>
          <div class="flex gap-4">
            <button
              mat-stroked-button
              class="w-full"
              (click)="discardChanges()"
            >
              Discard Changes
            </button>
            <button
              mat-flat-button
              color="primary"
              class="w-full"
              (click)="save()"
            >
              Save
            </button>
          </div>
        </div>
      </mat-card>
    </form>
  `,
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note!: Note;

  public _videoLink = '';

  public noteForm!: FormGroup;
  public safeSrc!: SafeResourceUrl;

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

    this.safeSrc = this.setSafeSrc(this.note.videoLink);

    this.noteForm.get('videoLink')!.valueChanges.subscribe((link) => {
      this.safeSrc = this.setSafeSrc(link);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.note && this.noteForm) {
      this.noteForm.setValue({
        videoLink: this.convertLink(this.note.videoLink),
        title: this.note.title,
        content: this.note.content,
      });
    }
  }

  public setSafeSrc(link: string): SafeResourceUrl {
    const convertedLink = this.convertLink(link);
    return this.sanitizeLink(convertedLink);
  }

  public sanitizeLink(link: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  public convertLink(link: string) {
    return link.split('watch?v=').join('embed/');
  }

  public discardChanges(): void {
    this.noteForm.setValue({
      videoLink: this.note.videoLink,
      title: this.note.title,
      content: this.note.content,
    });
  }

  public save() {
    console.log('videoLink', this.noteForm.value.videoLink);
    console.log('content', this.noteForm.value.content);
  }
}
