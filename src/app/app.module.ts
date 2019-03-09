import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';


@NgModule({
  declarations: [AppComponent, DataTableComponent], imports: [BrowserModule, NgxDatatableModule], providers: [], bootstrap: [AppComponent]
})
export class AppModule {
}
