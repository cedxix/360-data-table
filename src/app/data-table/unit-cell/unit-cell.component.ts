import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import unitsTable from './constants/units-constants';
import { get } from 'lodash';

@Component({
  selector: 'app-unit-cell',
  templateUrl: './unit-cell.component.html',
  styleUrls: ['./unit-cell.component.scss']
})
export class UnitCellComponent implements OnInit {

  private unitTypes = '';
  private currentUnit = '';
  private currentLabel = '';

  @Input() set unitType(unit) {
    this.unitTypes = get(unitsTable, `${unit}`);
  }

  @Input() set value(value) {
    this.currentUnit = value.unit;
    this.currentLabel = value.label;
  }

  @Output() change = new EventEmitter<object>();


  onUnitChange(evt) {
    this.currentUnit = evt.target.value;
    this.change.emit({
      unit: this.currentUnit,
      label: this.currentLabel
    });
  }

  onValueChange(value) {
    this.currentLabel = value;
    this.change.emit({
      unit: this.currentUnit,
      label: this.currentLabel
    });

  }

  constructor() {
  }

  ngOnInit() {
  }

}
