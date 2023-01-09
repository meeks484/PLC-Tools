import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule} from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BitTypeConversionService } from './bit-type-conversion.service';
import { DataTypeConversionComponent } from './data-type-conversion/data-type-conversion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { UDTStreamComponent } from './udt-stream/udt-stream.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { DropzoneDirective } from './directive/dropzone.directive';
import { HttpClientModule} from '@angular/common/http';
import { InputTableComponent } from './input-table/input-table.component';
import { OutputTableComponent } from './output-table/output-table.component';





@NgModule({
  declarations: [
    AppComponent,
    DataTypeConversionComponent,
    UDTStreamComponent,
    NavbarComponent,
    HomeComponent,
    DropzoneDirective,
    InputTableComponent,
    OutputTableComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AgGridModule,
        FormsModule,
        NgSelectModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatInputModule,
        MatTableModule,
        RouterModule.forRoot([
          {path: '', component: HomeComponent},
          {path: 'typeConversion', component: DataTypeConversionComponent},
          {path: 'UDTStream', component: UDTStreamComponent}
        ])
    ],
  providers: [
    //BitTypeConversionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
