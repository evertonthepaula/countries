import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { Observable, catchError, finalize, map, of } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { CountryBasics } from '../../../core/interfaces/country.interface';
import { CountryResponse } from '../../../core/interfaces/response/country-response.iterface';
import { CountriesDataService } from '../../../core/services/data/countries/countries-data.service';
import { CountriesHttpService } from '../../../core/services/http/countries/countries-http.service';
import { CardCountryComponent } from '../../components/card-country/card-country.component';
import { LoaderSpinnerComponent } from '../../components/loaders/spinner/spinner.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    FontAwesomeModule,
    CardCountryComponent,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    LoaderSpinnerComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  country$!: Observable<CountryBasics>;
  faArrowLeft: IconProp = faArrowLeft;
  isLoading: boolean = true;

  constructor(
    private readonly countriesHttpService: CountriesHttpService,
    private readonly countriesDataService: CountriesDataService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.fetchCoutry(params.get('id')));
  }

  fetchCoutry(id: string | null) {
    if (!id) return;

    this.country$ = this.countriesHttpService
      .find(id)
      .pipe(
        map((result: CountryResponse[]) => this.countriesDataService.basicCountry(result[0])),
        catchError(error => of()),
        finalize(() => this.isLoading = false)
      );
  }
}
