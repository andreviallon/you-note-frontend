import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <mat-drawer-container class="h-full bg-white" autosize>
      <mat-drawer #drawer mode="side" opened="true">
        <app-sidebar></app-sidebar>
      </mat-drawer>

      <app-header (toggleMenu)="drawer.toggle()"></app-header>
      <div class="w-full h-full drawer p-4">
        <app-note-container></app-note-container>
      </div>
    </mat-drawer-container>
  `,
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public showSideBar = true;
}
