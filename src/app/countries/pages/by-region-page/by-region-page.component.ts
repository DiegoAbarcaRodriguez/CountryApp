import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService: CountriesService) { }

  countries: Country[] = [];
  regiones: Region[] = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries; //Carga la data mantenida en el service, para que no se pierda al cambiar de rutas
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region): void {

    this.selectedRegion = term;
    this.isLoading = true;

    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.isLoading = false;
        this.countries = countries
      })
  }

}
