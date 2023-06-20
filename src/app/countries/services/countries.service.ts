import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);


  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(catchError(() => of([])))//Definición de pipe catchError es propio de rxjs permite atrapar el error producido y retorna un nuevo Observable of([]) con un arrray vacio en lugar de crashear el aplicativo
      .pipe(delay(2000))
  }

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`
    return this.getCountriesRequest(url)
      .pipe(tap(countries => this.cacheStore.byCapital = { term, countries }))
      .pipe(tap(() => this.saveToLocalStorage()));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`
    return this.getCountriesRequest(url)
      .pipe(tap(countries => this.cacheStore.byCountries = { term, countries }))
      .pipe(tap(() => this.saveToLocalStorage()));
  }

  searchRegion(term: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${term}`
    return this.getCountriesRequest(url)
      .pipe(tap(countries => this.cacheStore.byRegion = { region: term, countries }))
      .pipe(tap(() => this.saveToLocalStorage()));
  }

  searchCountryByAlphaCode(code: String): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`
    return this.http.get<Country[]>(url)
      .pipe(map(countries => countries.length > 0 ? countries[0] : null)) //map rxjs edita los valores recibidos por el observable
      .pipe(catchError(error => of(null))); //Captura error en caso de que el code ingresado no exista y en su lugar retorna un observable con el valor de null
  }

}
