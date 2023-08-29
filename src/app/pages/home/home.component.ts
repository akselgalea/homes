import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from 'src/app/components/housing-location/housing-location.component';
import { HousingLocation } from 'src/app/models/housing-location.model';
import { HousingService } from 'src/app/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section class="w-[500px] mx-auto flex items-center justify-center gap-2">
      <input class="border h-full p-1" type="text" placeholder="Filtrar por ciudad" #filter>
      <button class="bg-slate-900 text-white rounded-md py-1 px-3" (click)="filterResults(filter.value)">Buscar</button>
    </section>

    <section class="mt-7 grid grid-cols-3 gap-3">
      <app-housing-location [location]="location" *ngFor="let location of filteredLocations" />
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  locations: HousingLocation[] = [];
  filteredLocations: HousingLocation[] = [];

  constructor() {
    this.housingService.index().then((locations: HousingLocation[]) => {
      this.locations = locations;
      this.filteredLocations = locations;
    });
  }

  filterResults(value: string) {
    this.filteredLocations = this.locations.filter(loc => loc.city.includes(value.toLowerCase()));
  }
}
