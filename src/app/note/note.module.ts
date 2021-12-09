import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';

const components = [HeaderComponent, SidebarComponent, LayoutComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MaterialModule],
  exports: [...components],
})
export class NoteModule {}
