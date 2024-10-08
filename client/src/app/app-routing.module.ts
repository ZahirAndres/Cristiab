import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/registro/inicio.component'
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
{ path : '', redirectTo: '/login', pathMatch : 'full' },

{ path : 'login', component : LoginComponent },

{ path : 'registro', component : InicioComponent},
{ path : 'index', component : IndexComponent},

{  path : '**', redirectTo : '/login'}//esto es por si ninguna de las rutas coincide
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
