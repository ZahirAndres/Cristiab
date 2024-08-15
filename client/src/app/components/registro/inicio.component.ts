import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { Usuarios } from '../../models/login';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  usuario: Usuarios = {
    Usename: '',
    Password: ''
  };

  constructor(private gamesService: GamesService, private router: Router) {}

  onSubmit() {
    this.gamesService.saveUsuario(this.usuario).subscribe(
      response => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/login']); // Redirigir al login después del registro
      },
      error => {
        console.error('Error al registrar usuario', error);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
