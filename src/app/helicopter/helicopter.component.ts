import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelicopterModel } from '../models/helicopter-model';

@Component({
  selector: 'app-helicopter',
  standalone: true,
  imports: [],
  templateUrl: './helicopter.component.html',
  styleUrl: './helicopter.component.css',
})
export class HelicopterComponent {
  @Input() model: HelicopterModel | undefined = undefined;
  @Output() saved = new EventEmitter<HelicopterModel>();

  getValue(event: any): string {
    return event.target.value;
  }
  getNumberValue(event: any): number {
    return Number(event.target.value);
  }
  save(){
    this.saved.emit(this.model)
  }
}
