import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MenuItem } from 'primeng/api';
import { FirebaseAuthCustomService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  items: MenuItem[] = [];
  obj: any;
  constructor(
    private fireAuthCustomService: FirebaseAuthCustomService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obj = JSON.parse(localStorage.getItem('user') || '{}');
    var img = document.createElement("img");
    img.src = this.obj.photoURL;
    img.alt = "image";
    img.style.float = "left";
    img.referrerPolicy = "no-referrer";
    this.items = [
      {
        label: 'Generate Video',
        icon: 'pi pi-code',
        routerLink: ['/main','generate']
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-database',
        routerLink: ['/main','dashboard']
      }
    ];
  }
  
  logout() {
    sessionStorage.clear();
    this.fireAuthCustomService.logout();
    this.router.navigate(['/auth', 'login']);
  }

}
