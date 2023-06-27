import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputDataComponent } from './views/main/input-data/input-data.component';
import { HistorialComponent } from './views/historial/historial.component';
import { ShowDataComponent } from './views/show-data/show-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: 'main',
		component: InputDataComponent
	},
	{
		path: 'historial',
		component: HistorialComponent
	},
	{
		path: 'show/:id',
		component: ShowDataComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
