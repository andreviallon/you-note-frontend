import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="w-96 h-full p-4 flex flex-col justify-between">
      <app-notes-list></app-notes-list>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">john.doe@gmail.com</span>
        <button mat-stroked-button color="accent">Logout</button>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {}
