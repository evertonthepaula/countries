import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CountriesResponse } from '../../../interfaces/response/countries-response.iterface';
import { CountryResponse } from '../../../interfaces/response/country-response.iterface';

@Injectable({
  providedIn: 'root'
})
export class CountriesHttpService {
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * Gets a list of countries -- no paginated
   */
  getAll(): Observable<CountriesResponse[]> {
    return this.http.get<CountriesResponse[]>(`${environment.countriesapi}/all`);
  }

  /**
   * Gets a country by code
   */
  find(code: string): Observable<CountryResponse[]> {
    return this.http.get<CountryResponse[]>(`${environment.countriesapi}/alpha/${code}`);
  }

  /**
   * Gets a country by name
   */
  findByName(name: string): Observable<CountryResponse[]> {
    return this.http.get<CountryResponse[]>(`${environment.countriesapi}/name/${name}`);
  }

  /**
   * Gets a country by region
   */
  findByRegion(region: string): Observable<CountryResponse[]> {
    return this.http.get<CountryResponse[]>(`${environment.countriesapi}/region/${region}`);
  }

}
