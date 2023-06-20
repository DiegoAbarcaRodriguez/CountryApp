import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }


  public countries: Country[] = [];
  public initialValue: string = '';

  isLoading: boolean = false;


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries; //Carga la data mantenida en el service, para que no se pierda al cambiar de rutas
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {

    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.isLoading = false;
        this.countries = countries
      })
  }
}
