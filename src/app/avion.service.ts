import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { avion } from './models/avion';
import { firstValueFrom } from 'rxjs';


const url = "http://localhost:3000/"


@Injectable({
  providedIn: 'root'
})
export class AvionService {

  http = inject(HttpClient);

  constructor() { }

  getAvions() {
    return this.http.get(url + "avions");
  }

  addAvion(a) {
    return firstValueFrom(this.http.post(url + "avions", a))
  }

  updateAvion(id, a) {
    return firstValueFrom(this.http.put(url + "avions/" + id, a))
  }

  deleteAvion(id: number) {
    return firstValueFrom(this.http.delete(url + "avions/" + id))
  }
}
