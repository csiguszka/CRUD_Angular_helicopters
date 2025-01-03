import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelicopterModel } from './models/helicopter-model';
import { DataService } from '../services/data.service';
import { HelicopterComponent } from "./helicopter/helicopter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HelicopterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  helicopters: HelicopterModel[] = [];
  modify: HelicopterModel | undefined = undefined;
  new: HelicopterModel | undefined = undefined;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getHelicopter().subscribe({
      next: (data: HelicopterModel[]) => {
        this.helicopters = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newHelicopter() {
        this.new = {
          id: undefined,
          name: '',
          manufacturer: '',
          type: '',
          maxSpeedKmh: 0,
          passengerCapacity: 0,
        };
  }

  saveNew(helicopter: HelicopterModel){
    this.dataService.addHelicopter(helicopter).subscribe({
      next: (data: HelicopterModel) => {
        this.helicopters.push(data);
        this.new = undefined;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  modifyHelicopter(helicopter: HelicopterModel) {
    this.modify = JSON.parse(JSON.stringify(helicopter));
  }
  saveModify(helicopter: HelicopterModel) {
    this.dataService.modifyHelicopter(helicopter).subscribe({
      next: (data: HelicopterModel) => {
        const index = this.helicopters.findIndex((h) => h.id === data.id);
        this.helicopters[index] = data;
        this.modify = undefined;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteHelicopter(helicopter: HelicopterModel) {
    this.dataService.deleteHelicopter(helicopter).subscribe({
      next: (data: HelicopterModel) => {
        const index = this.helicopters.findIndex((h) => h.id === data.id);
        this.helicopters.splice(index, 1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
