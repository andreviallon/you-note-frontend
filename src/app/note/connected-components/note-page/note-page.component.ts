import { Component } from '@angular/core';
import { mockNotes } from '../../note-mock-data';

@Component({
  selector: 'app-note-page',
  template: `
    <mat-drawer-container class="h-full bg-white" autosize>
      <mat-drawer #drawer mode="side" opened="true">
        <app-sidebar></app-sidebar>
      </mat-drawer>

      <div class="flex flex-col justify-between w-full h-full min-h-full">
        <app-header (toggleMenu)="drawer.toggle()"></app-header>
        <div class="h-full drawer p-4 container mx-auto">
          <app-note [note]="note"></app-note>
        </div>
      </div>
    </mat-drawer-container>
  `,
  styleUrls: ['./note-page.component.scss'],
})
export class NotePageComponent {
  public showSideBar = true;
  public note = mockNotes[0];
}
