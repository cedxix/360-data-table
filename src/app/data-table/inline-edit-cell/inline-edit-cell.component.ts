import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inline-edit-cell',
  templateUrl: './inline-edit-cell.component.html',
  styleUrls: ['./inline-edit-cell.component.scss']
})
export class InlineEditCellComponent implements OnInit {
  private currentValue: string | number = '';
  private inputType: string;
  private isEditing: boolean;

  @Input() set value(value: string | number) {
    this.inputType = typeof (value) === 'number' ? 'number' : 'string';
    this.currentValue = value;
  }

  @Output() change: EventEmitter<string | number> = new EventEmitter<string | number>();

  onChange(evt) {
    if ((evt.type === 'keypress' && evt.key === 'Enter') || evt.type === 'blur') {
      this.isEditing = false;
      this.currentValue = evt.target.value;
      this.change.emit(evt.target.value);
    }
  }

  ngOnInit() {
  }

}
