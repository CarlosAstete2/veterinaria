import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;
  error = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const { usuario, clave } = this.form.value;
    const ok = this.authService.login(usuario, clave);
    if (ok) {
      this.router.navigate(['/mascotas']);
    } else {
      this.error = true;
    }
  }
}
