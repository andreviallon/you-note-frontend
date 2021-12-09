import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="flex items-center" color="primary">
      <button mat-icon-button (click)="toggleMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <h1 class="pl-2">You Note</h1>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter();
}
