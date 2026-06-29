import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'vet_auth';
  private readonly USUARIO = 'admin';
  private readonly CLAVE = 'admin123';

  constructor(private router: Router) {}

  login(usuario: string, clave: string): boolean {
    if (usuario === this.USUARIO && clave === this.CLAVE) {
      localStorage.setItem(this.KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.KEY) === 'true';
  }
}
