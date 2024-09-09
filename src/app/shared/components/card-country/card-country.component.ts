import { NgStyle } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryBasics, CountryListBasics } from '../../../core/interfaces/country.interface';

@Component({
  selector: 'app-card-country',
  standalone: true,
  templateUrl: './card-country.component.html',
  styleUrls: ['./card-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontAwesomeModule,
    NgStyle
  ]
})
export class CardCountryComponent {
  @Input() country!: CountryBasics | CountryListBasics;
}
