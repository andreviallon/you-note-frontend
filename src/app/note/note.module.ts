import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const components = [
  HeaderComponent,
  SidebarComponent,
  LayoutComponent,
  NotesListComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MaterialModule],
  exports: [...components],
})
export class NoteModule {}
