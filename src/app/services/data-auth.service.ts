import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})

export class DataAuthService {
  usuario: Usuario | undefined;

  constructor() {
    const tokenLocalStorage = localStorage.getItem("authToken");
    if(tokenLocalStorage) {
      const userLocalStorage = parseJwt(tokenLocalStorage)
      if(!userLocalStorage) return;
      this.usuario = {
        username : userLocalStorage.username,
        token: tokenLocalStorage,
        esAdmin: userLocalStorage.esAdmin ? true : false
      }

    this.usuario!.token = tokenLocalStorage

    }
   }


  async login(loginData: Login) {
    const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    if (res.status !== 200) return;

    const resJson: ResLogin = await res.json();

    if (!resJson.token) return;

    this.usuario = {
        username: loginData.username,
        token: resJson.token,
        esAdmin: true
    };


    localStorage.setItem("authToken", resJson.token);

    const userDetailsRes = await fetch(`http://localhost:4000/usuarios/${encodeURIComponent(loginData.username)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${resJson.token}`,
            'Content-Type': 'application/json'
        }
    });

    if (userDetailsRes.status !== 200) return;

    const userDetailsResJson = await userDetailsRes.json();

    this.usuario.esAdmin = userDetailsResJson.esAdmin;

    return userDetailsRes;
  }

  async register(registerData: Register) {
    const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });

    if (res.status !== 201) return;
    return res;
  }

  getToken() {
    return localStorage.getItem("authToken");
  }

  clearToken() {
    localStorage.removeItem("authToken")
  }
  
}

function parseJwt (token:string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

