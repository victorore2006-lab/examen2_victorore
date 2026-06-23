import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    if (this.authService.estaLogueado()) {
      this.onLogout();
      return;
    }
  }

  onLogout = (): void => {
    this.authService.sacarAlWeon();
    this.router.navigate(['/login']);
  };
}
