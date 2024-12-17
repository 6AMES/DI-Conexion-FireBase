import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [FormBuilder]
})

export class HeaderComponent implements AfterViewInit {
  emailIn = '';
  passwordIn = '';
  emailOn = '';
  passwordOn = '';
  repeatPassword = '';
  form: FormGroup;
  form2: FormGroup;

  private modal: HTMLElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private fb2: FormBuilder
  ) {
    this.form = this.fb.group({
      email: [''], 
      password: [''] 
    });
    this.form2 = this.fb2.group({
      emailOn: [''],
      passwordOn: [''],
      passwordOn2: ['']
    })
  }

  ngAfterViewInit() {
    this.modal = this.elementRef.nativeElement.querySelector('#signupin');
    if (this.modal) {
      this.renderer.listen(window, 'click', (event: Event) => {
        if (event.target === this.modal && this.modal) {
          this.modal.style.display = 'none';
        }
      });
    }
  }

  login() {
    const {email, password} = this.form.value;
    this.authService.login(email, password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        this.modal!.style.display = 'none';
        this.router.navigate(['/home']);
        this.form.reset();
      })
      .catch(err => alert('Error al iniciar sesión: ' + err.message));
  }

  register() {
    const {emailOn, passwordOn, passwordOn2} = this.form2.value;
    if (passwordOn !== passwordOn2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.authService.register(emailOn, passwordOn)
      .then(() => {
        alert('Cuenta creada exitosamente');
        this.modal!.style.display = 'none';
        this.router.navigate(['/home']);
        this.form2.reset();
      })
      .catch(err => alert('Error al registrar cuenta: ' + err.message));
  }
}