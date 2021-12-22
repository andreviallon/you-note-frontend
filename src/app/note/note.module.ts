import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { NotePageComponent } from './connected-components/note-page/note-page.component';
import { NoteComponent } from './components/note/note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { QuillModule } from 'ngx-quill';
import { NoteState } from './state/note.state';
import { NgxsModule } from '@ngxs/store';

const components = [
  HeaderComponent,
  SidebarComponent,
  NotePageComponent,
  NotesListComponent,
  NoteComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    NgxsModule.forFeature([NoteState]),
  ],
  exports: [...components],
})
export class NoteModule {}
