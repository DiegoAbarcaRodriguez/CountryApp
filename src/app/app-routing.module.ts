import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /* {
     path: 'about',
     component: AboutPageComponent
   },
   {
     path: 'contact',
     component: ContactPageComponent
   },*/
  {
    path: 'countries', //Aplica lazyLoad para el modulo countries.module.ts y así mismo conecta las rutas definididas por el routing secundario como: /countries/bycapital
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
