import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { Usuarios } from '../../models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private gamesService: GamesService) {
    this.loginForm = this.fb.group({
      Usename: ['', Validators.required],  // Cambiado de 'username' a 'Usename'
      Password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const usuario: Usuarios = {
      Usename: this.loginForm.value.Usename,  // Cambiado de `Usename` a `Usename`
      Password: this.loginForm.value.Password
    };
  
    this.gamesService.login(usuario).subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/index']); // Redirige a la página principal después del inicio de sesión
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }
  
  
  goToRegistration(): void {
    this.router.navigate(['/registro']);
  }
}
