import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DataTableComponent } from './data-table-component/data-table.component';
import { UnitCellComponent } from './unit-cell/unit-cell.component';
import { InlineEditCellComponent } from './inline-edit-cell/inline-edit-cell.component';


@NgModule({
  declarations: [
    DataTableComponent,
    UnitCellComponent,
    InlineEditCellComponent
  ],
  exports: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule
  ]
})
export class DataTableModule { }
