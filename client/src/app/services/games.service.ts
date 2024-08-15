import { Injectable } from '@angular/core';
import{ HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Usuarios } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  API_URI = 'http://localhost:3000/usuario'; // Dirección del backend

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<Usuarios[]>(`${this.API_URI}`).pipe(
      catchError(this.handleError)
    );
  }

  saveUsuario(usuario: Usuarios) {
    return this.http.post(`${this.API_URI}/registro`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  login(usuario: Usuarios) {
    return this.http.post(`${this.API_URI}/login`, usuario).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
