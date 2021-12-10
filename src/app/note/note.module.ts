import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteContainerComponent } from './note-container/note-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const components = [
  HeaderComponent,
  SidebarComponent,
  LayoutComponent,
  NotesListComponent,
  NoteContainerComponent,
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
