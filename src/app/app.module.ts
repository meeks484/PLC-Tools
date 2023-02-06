import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule} from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Binary } from './Binary';
import { DataTypeConversionComponent } from './data-type-conversion/data-type-conversion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { UDTStreamComponent } from './udt-stream/udt-stream.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { HttpClientModule} from '@angular/common/http';
import { InputTableComponent } from './input-table/input-table.component';
import { OutputTableComponent } from './output-table/output-table.component';
import { InputSectionComponent } from './input-section/input-section.component';
import { OutputSectionComponent } from './output-section/output-section.component';
import { StreamTableComponent } from './stream-table/stream-table.component';
import { Rs232Component } from './rs232/rs232.component';






@NgModule({
  declarations: [
    AppComponent,
    DataTypeConversionComponent,
    UDTStreamComponent,
    NavbarComponent,
    HomeComponent,
    InputTableComponent,
    OutputTableComponent,
    InputSectionComponent,
    OutputSectionComponent,
    StreamTableComponent,
    Rs232Component
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
          {path: 'UDTStream', component: UDTStreamComponent},
          {path: 'rs232', component: Rs232Component}
        ])
    ],
  providers: [
    Binary
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
