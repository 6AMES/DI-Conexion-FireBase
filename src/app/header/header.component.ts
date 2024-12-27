import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private fb1 = inject(FormBuilder);
  private fb2 = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form1: FormGroup;
  form2: FormGroup;
  errorMessage: string = '';

  isModalVisible: boolean = false;
  isSignInForm: boolean = true;

  constructor() {
    this.form1 = this.fb1.group({
      email1: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.form2 = this.fb2.group({
      email2: ['', [Validators.required, Validators.email]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      passwordVerification: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form1.valid) {
      const email = this.form1.get('email1')?.value;
      const password = this.form1.get('password1')?.value;
  
      this.authService.login(email, password).subscribe({
        next: () => {
          this.closeModal();
          this.router.navigate(['/account']);
          this.form1.reset();
        },
        error: (error) => {
          this.errorMessage = this.getErrorMessage(error.code);
          console.error('Error en login:', error);
        }
      });
    }
  }

  register() {
    if (this.form2.valid) {
      const { email2, password2, passwordVerification } = this.form2.value;
  
      if (password2 !== passwordVerification) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }
  
      this.authService.register(email2, password2, { email: email2 }).subscribe({
        next: () => {
          this.closeModal();
          this.router.navigate(['/account']);
          this.form2.reset();
        },
        error: (error) => {
          this.errorMessage = this.getErrorMessage(error.code);
        }
      });
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch(errorCode) {
      case 'auth/user-not-found':
        return 'No se encontró un usuario con este correo electrónico.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta nuevamente más tarde.';
      default:
        return 'Ocurrió un error. Por favor, intenta nuevamente.';
    }
  }

  toggleModal(isSignIn: boolean): void {
    this.isModalVisible = true;
    this.isSignInForm = isSignIn;
    this.form1.reset();
    this.form2.reset();
  }
  
  closeModal(): void {
    this.isModalVisible = false;
  }

  checkAuth(): void {
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/account']);
      } else {
        this.toggleModal(true);
      }
    });
  }
}