import { Injectable } from '@angular/core';
import { HousingLocation } from './models/housing-location.model';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  constructor() {}

  async index() : Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async get(id: number) : Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? null;
  }

  submitApplication(firstName: string, lastName:string, email: string) {
    return console.log(firstName, lastName, email);
  }
}
