import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './connected-components/layout/layout.component';
import { NoteComponent } from './components/note/note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

const components = [
  HeaderComponent,
  SidebarComponent,
  LayoutComponent,
  NotesListComponent,
  NoteComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [...components],
})
export class NoteModule {}
