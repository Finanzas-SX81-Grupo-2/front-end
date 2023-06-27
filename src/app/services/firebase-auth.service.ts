import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  signInWithPopup, GoogleAuthProvider
} from '@angular/fire/auth';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthCustomService {
	baseApiUrl = "https://finanzas-upc-backend.azurewebsites.net"
	accessTokenGiven: any;



  constructor(private auth: Auth, private http: HttpClient) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

	async getFlujos() {
		this.accessTokenGiven = JSON.parse(localStorage.getItem('user') || '{}');
		this.accessTokenGiven = this.accessTokenGiven.stsTokenManager.accessToken;
		return await axios.get(this.baseApiUrl + '/get-flujos', {
				headers: {
						"Authorization": `Bearer ${this.accessTokenGiven}`,
						'content-type': 'plain/text'
				}
		});
	}

	async getFlujo(id: string) {
		this.accessTokenGiven = JSON.parse(localStorage.getItem('user') || '{}');
		this.accessTokenGiven = this.accessTokenGiven.stsTokenManager.accessToken;
		return await axios.get(this.baseApiUrl + '/get-flujo/'+ id, {
				headers: {
						"Authorization": `Bearer ${this.accessTokenGiven}`,
						'content-type': 'plain/text'
				}
		});
	}

	async guardarFlujo(videoForm: any) {
		this.accessTokenGiven = JSON.parse(localStorage.getItem('user') || '{}');
		this.accessTokenGiven = this.accessTokenGiven.stsTokenManager.accessToken;
		await axios.post(this.baseApiUrl + '/post-flujo',videoForm, {
				headers: {
						"Authorization": `Bearer ${this.accessTokenGiven}`,
						'Content-Type': 'application/json'
				}
		}).then((response) => {
				console.log(response);
		}).catch((error) => {
				//console.log(error);
		});
	}

	async deleteFlujo(id: string) {
		this.accessTokenGiven = JSON.parse(localStorage.getItem('user') || '{}');
		this.accessTokenGiven = this.accessTokenGiven.stsTokenManager.accessToken;
		return await axios.get(this.baseApiUrl + '/delete-flujo/'+ id, {
				headers: {
						"Authorization": `Bearer ${this.accessTokenGiven}`,
						'content-type': 'plain/text'
				}
		});
	}



}
