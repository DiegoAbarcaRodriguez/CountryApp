import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-table',
  templateUrl: 'country-table.component.html',
  styles: [
    ` img{
      width:25px
      }
    `
  ]
})

export class CountryTableComponent {
  constructor() { }

  @Input()
  countries: Country[] = [];


}
