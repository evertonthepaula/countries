import { CountriesResponse } from './response/countries-response.iterface';
import { CountryResponse, Currency } from './response/country-response.iterface';

export type CountryListBasics = Pick<CountriesResponse, 'name' | 'population' | 'region' | 'capital' | 'flags' | 'ccn3'>;

export type CountryBasics = Pick<CountryResponse, 'name' | 'population' | 'region' | 'subregion' | 'capital' | 'flags' | 'borders' | 'ccn3'> & {
  currencies: NonNullable<Currency[]>;
  languages: NonNullable<string>;
};
