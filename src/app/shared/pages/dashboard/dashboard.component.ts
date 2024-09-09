import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { map, switchMap, Observable, debounceTime, distinctUntilChanged, filter, catchError, of, finalize } from 'rxjs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { CountryListBasics, CountryBasics } from '../../../core/interfaces/country.interface';
import { CountriesResponse } from '../../../core/interfaces/response/countries-response.iterface';
import { CountryResponse } from '../../../core/interfaces/response/country-response.iterface';
import { CountriesDataService } from '../../../core/services/data/countries/countries-data.service';
import { CountriesHttpService } from '../../../core/services/http/countries/countries-http.service';
import { CardCountryComponent } from '../../components/card-country/card-country.component';
import { LoaderSpinnerComponent } from '../../components/loaders/spinner/spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    CardCountryComponent,
    ReactiveFormsModule,
    FontAwesomeModule,
    AsyncPipe,
    RouterLink,
    LoaderSpinnerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listCountries!: CountryListBasics[] | CountryBasics[];
  faMagnifyingGlass: IconProp = faMagnifyingGlass;
  formControlRegions = new FormControl('');
  formControlSearch = new FormControl();
  isLoading: boolean = true;

  constructor(
    private readonly countriesHttpService: CountriesHttpService,
    private readonly countriesDataService: CountriesDataService
  ) { }

  ngOnInit() {
    this.initialCountries();
    this.defineSearchBehavior();
    this.defineRegionsBehavior();
  }

  private initialCountries(): void {
    this.fetchCountries().subscribe(result => { this.listCountries = result });
  }

  private defineRegionsBehavior(): void {
    this.formControlRegions.valueChanges
      .pipe(
        switchMap((region: string | null) => this.fetchSelectRegion(region))
      ).subscribe((result: CountryListBasics[] | CountryBasics[]) => { this.listCountries = result });
  }

  private fetchSelectRegion(region: string | null): Observable<CountryListBasics[] | CountryBasics[]> {
    this.isLoading = true;
    this.listCountries = [];
    if (region) {
      return this.countriesHttpService
        .findByRegion(region)
        .pipe(
          map((response: CountryResponse[]) => this.countriesDataService.basicsListCountry(response)),
          catchError(error => of([])),
          finalize(() => this.isLoading = false)
        );
    }

    return this.fetchCountries();
  }


  private defineSearchBehavior(): void {
    this.formControlSearch.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((name: string) => name.length > 1 || name.length === 0),
        switchMap((name: string) => this.fetchfilterName(name)),
      ).subscribe((result: CountryListBasics[] | CountryBasics[]) => { this.listCountries = result });
  }

  private fetchfilterName(name?: string): Observable<CountryListBasics[] | CountryBasics[]> {
    this.isLoading = true;
    this.listCountries = [];

    if (name) {
      return this.countriesHttpService
        .findByName(name)
        .pipe(
          map((response: CountryResponse[]) => this.countriesDataService.basicsListCountry(response)),
          catchError(error => of([])),
          finalize(() => this.isLoading = false)
        );
    }

    return this.fetchCountries();
  }

  private fetchCountries(): Observable<CountryListBasics[]> {
    this.isLoading = true;
    this.listCountries = [];

    return this.countriesHttpService
      .getAll()
      .pipe(
        map((response: CountriesResponse[]) => this.countriesDataService.basicsList(response)),
        catchError(error => of([])),
        finalize(() => this.isLoading = false)
      );
  }

}
