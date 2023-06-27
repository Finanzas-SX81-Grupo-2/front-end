import { Component, OnInit } from '@angular/core';
import { FirebaseAuthCustomService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

	flujos: any[] = [	]

	constructor(private service: FirebaseAuthCustomService,
		private router: Router
		) {
		this.service.getFlujos().then((res: any) => {
			this.flujos = res.data;
			console.log(this.flujos);
		})
	}

  ngOnInit(): void {
	}
	
	mostrarMas(flujo: any) {
		console.log(flujo);
		this.router.navigate(['/show', flujo.id]);

	}

	eliminar(flujo: any) {
		this.service.deleteFlujo(flujo.id);
	}
		
}
