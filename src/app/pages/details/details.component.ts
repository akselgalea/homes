import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from 'src/app/models/housing-location.model';
import { HousingService } from 'src/app/housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article *ngIf="location != undefined;else noExiste" class="max-w-[500px] flex flex-col gap-3">
      <img [src]="location.photo" class="max-w-[600px] max-h-[400px] rounded-2xl object-cover" width="600" height="400" alt="Exterior photo of {{location.name}} location">
      <section>
        <h2 class="text-2xl font-bold">{{ location.name }}</h2>
        <p class="text-xl font-semibold">{{ location.city }}, {{ location.state }}</p>
      </section>

      <section>
        <h2 class="text-lg font-bold">About this housing location</h2>
        <ul>
          <li>Units available: {{ location.availableUnits }}</li>
          <li>Wi-fi: {{ location.wifi ? 'yes' : 'no' }}</li>
          <li>Laundry: {{ location.laundry ? 'yes' : 'no' }}</li>
        </ul>
      </section>
      <hr>
      <section>
        <h2 class="text-lg font-bold mb-2">Apply now to live here</h2>
        
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <div class="mb-6">
            <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
            <input
              type="text"
              id="firstName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              formControlName="firstName"
            >
          </div>

          <div class="mb-6">
            <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
            <input
              type="text"
              id="lastName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              formControlName="lastName"
            >
          </div>
          
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              formControlName="email"
              placeholder="email@example.com"
              >
          </div>

          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply now</button>
        </form>
      </section>
    </article>
    <ng-template #noExiste>Housing location not found</ng-template>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  location: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.get(housingLocationId).then((location: HousingLocation | undefined) => {
      this.location = location;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
