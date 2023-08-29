import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from 'src/app/models/housing-location.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="flex flex-col rounded-md overflow-hidden bg-slate-200">
      <img class="w-full h-[200px] object-cover object-center" [src]="location.photo" alt="Exterior photo of {{location.name}}"  />
      <div class="px-2 py-2">
        <h2 class="text-md font-semibold">{{location.name}}</h2>
        <p class="text-sm font-bold">{{location.city}}</p>
        <a [routerLink]="['/details', location.id]">Learn more...</a>
      </div>
    </article>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() location!: HousingLocation;
}
