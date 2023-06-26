import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { FirebaseAuthCustomService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  credentialsError: boolean = false;

  constructor(
    private fireAuthCustomService: FirebaseAuthCustomService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email],updateOn: 'change'}],
      password: ['', { validators: [Validators.required, Validators.minLength(6)],updateOn: 'change'}],
    });
  }

  onSubmit() { 
    this.fireAuthCustomService.login(this.loginForm.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/main', 'generate']);
      })
      .catch(error => {
        console.log(error);
        this.credentialsError = true;
      });
          
  }

  onClick() {
    this.fireAuthCustomService.loginWithGoogle()
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  }

  goToRegister() {
    this.router.navigate(['/auth', 'register']);
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

}
