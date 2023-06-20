import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit { //El OnInit se emplea para corroborar condiciones en el primer momento en el html es renderizado

  public country?: Country; //Puede ser null puesto que se inicializa caundo el componente se está contruyendo

  constructor(
    private activatedRoute: ActivatedRoute, //Determina la ruta actual
    private countriesService: CountriesService,
    private router: Router
  ) { } //El constructor se emplea para inicializar o corroborar condiciones cuando se comienza a crear el componente

  ngOnInit(): void {
    this.activatedRoute.params //extrae el parametro /:id de la ruta actual
      .pipe(switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id))) //une dos observables para evitar un hell observable
      .subscribe(country => {

        if (!country) return this.router.navigateByUrl(''); //dirrecciona a una dirección url especificada
        return this.country = country;
      })
  }



}
