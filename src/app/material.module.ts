import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const mat = [MatButtonModule];

@NgModule({
  imports: [...mat],
  exports: [...mat],
})
export class MaterialModule {}
