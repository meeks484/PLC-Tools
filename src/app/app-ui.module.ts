import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [
    uiModules,
    CommonModule
  ],
  exports: uiModules
})
export class AppUiModule { }
