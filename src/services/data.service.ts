import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelicopterModel } from '../app/models/helicopter-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:3000/helicopters';
  constructor(private http: HttpClient) {}
  getHelicopter(): Observable<HelicopterModel[]> {
    return this.http.get<HelicopterModel[]>(this.url);
  }

  addHelicopter(helicopter: HelicopterModel): Observable<HelicopterModel> {
    return this.http.post<HelicopterModel>(this.url, helicopter);
  }

  modifyHelicopter(helicopter: HelicopterModel): Observable<HelicopterModel> {
    console.log(helicopter)
    return this.http.put<HelicopterModel>(
      `${this.url}/${helicopter.id}`,
      helicopter
    );
  }

  deleteHelicopter(helicopter: HelicopterModel): Observable<HelicopterModel> {
    return this.http.delete<HelicopterModel>(`${this.url}/${helicopter.id}`);
  }
}
