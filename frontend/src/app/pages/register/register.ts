import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  fullName: string = '';
  email: string = '';
  password: string = '';

  message: string = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  register(): void {
    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.message = 'Cuenta creada correctamente';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error: any) => {
  this.message = error.error?.message || 'Error al registrar usuario';
  this.cdr.detectChanges();
},
    });
  }
}