import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  API_URI = 'http://localhost:3000/usuario'; // Dirección del backend
  //private loggedIn = new BehaviorSubject<boolean>(false); // Estado de autenticación

  constructor(private http: HttpClient) { }

  /*getUsuarios() {
    return this.http.get<tbl_User[]>(`${this.API_URI}`).pipe(
      catchError(this.handleError)
    );
  }

  saveUsuario(usuario: tbl_User) {
    return this.http.post(`${this.API_URI}/registro`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  deleteUsuario(ID: string) {
    return this.http.delete(`${this.API_URI}/${ID}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUsuario(id: number, updateUsuario: tbl_User) {
    return this.http.put(`${this.API_URI}/update/${id}`, updateUsuario).pipe(
      catchError(this.handleError)
    );
  }

  getUsuarioByCredentials(username: string, password: string) {
    return this.http.post<{ ID: number }>(`${this.API_URI}/validate`, { Usename: username, Password: password }).pipe(
      catchError(this.handleError)
    );
  }

  getUsuarioId(username: string) {
    return this.http.get<{ ID: number }>(`${this.API_URI}/id/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  login(username: string, password: string) {
    return this.getUsuarioByCredentials(username, password).pipe(
      tap(() => this.loggedIn.next(true)), // Actualiza el estado de autenticación en el login
      catchError((error) => {
        this.loggedIn.next(false);
        return throwError(error);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  logout() {
    this.loggedIn.next(false); // Actualiza el estado de autenticación al cerrar sesión
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
  }*/
}
