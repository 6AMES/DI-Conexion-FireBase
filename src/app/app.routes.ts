import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OfreceEmpComponent } from './ofrece-emp/ofrece-emp.component';
import { BuscaEmpComponent } from './busca-emp/busca-emp.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'ofreceEmp', component: OfreceEmpComponent },
    { path: 'buscaEmp', component: BuscaEmpComponent }
];
