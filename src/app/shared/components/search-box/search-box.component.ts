import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject(); //Creación de observable manualmente
  private debouncerSubscription?: Subscription;


  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  placeholder: string = '';

  @Input()
  initialValue: string = '';

  @ViewChild('txtInput')
  input!: ElementRef<HTMLInputElement>;

  ngOnInit(): void { //Ejecuta acción al inicializar el componente ( Lee valores del observable)
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.onDebounce.emit(valor);
      });
  }

  ngOnDestroy(): void { //Ejecuta acción al eliminar el componente al ejcutar un cambio de ruta o por ngif (desuscribe al observable)
    this.debouncerSubscription?.unsubscribe();
  }


  emitValue(): void {
    const value = this.input.nativeElement.value;
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm); //Emite valores al Observable debouncer cada que se teclea una letra
  }
}
