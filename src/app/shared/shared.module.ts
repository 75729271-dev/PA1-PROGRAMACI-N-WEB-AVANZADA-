import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StatusBadgeComponent } from "./status-badge.component";

@NgModule({
  declarations: [StatusBadgeComponent],
  imports: [CommonModule],
  exports: [StatusBadgeComponent],
})
export class SharedModule {}
