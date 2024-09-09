import { Injectable } from '@angular/core';
import { CountryListBasics, CountryBasics } from '../../../interfaces/country.interface';
import { CountriesResponse, } from '../../../interfaces/response/countries-response.iterface';
import { CountryResponse, Currencies, Currency, Languages } from '../../../interfaces/response/country-response.iterface';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {
  /**
   * Return a list of basics country info
   *
   * @param responseList A list for CountriesResponse Interface
   * @return The list of CountryListBasics Interface
   *
   */
  basicsList(responseList: CountriesResponse[]): CountryListBasics[] {
    return responseList.map(({ name, population, region, capital, flags, ccn3 }: CountriesResponse) => ({ name, population, region, capital, flags, ccn3 }))
  }

  /**
   * Return a list of basics country info
   *
   * @param responseList A list for CountriesResponse Interface
   * @return The list of CountryBasics Interface
   *
   */
  basicsListCountry(responseList: CountryResponse[]): CountryBasics[] {
    return responseList.map((country: CountryResponse) => this.basicCountry(country));
  }

  /**
   * Return basics country info
   *
   * @param response The CountryResponse Interface
   * @return The CountryBasics Interface
   *
   */
  basicCountry(response: CountryResponse): CountryBasics {
    const { name, population, region, subregion, capital, currencies, flags, languages, borders, ccn3 } = response;

    return { name, population, region, subregion, capital, flags, borders, ccn3, currencies: this.mapCurrenciesToArray(currencies), languages: this.mapLangaugesToArray(languages) };
  }

  /**
   * Return a map of currencies
   *
   * @param currencies The Currencies Interface
   * @return The Currency Interface Array
   *
   */
  private mapCurrenciesToArray(currencies: Currencies): Currency[] {
    return Object.keys(currencies).map((sigla: string) => currencies[sigla]);
  }

  /**
   * Return a map of languages
   *
   * @param languages The Languages Interface
   * @return The an Array of strings
   *
   */
  private mapLangaugesToArray(languages: Languages): string {
    return Object.keys(languages).map((language: string) => languages[language]).join(', ');
  }
}
