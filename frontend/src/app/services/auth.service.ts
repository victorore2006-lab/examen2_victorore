import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected readonly apiURL: string = 'http://localhost:5078/api/Auth';

  constructor(private http: HttpClient) {}

  login = (email: string, password: string): Observable<LoginResponse> =>
    this.http.post<LoginResponse>(`${this.apiURL}/login`, { email, password }).pipe(
      tap(res => this.saveToken(res.token)),
    );

  register(data: any) {
    return this.http.post(`${this.apiURL}/register`, data);
  }

  saveToken = (token: string): void => localStorage.setItem('token', token);

  getToken = (): string | null => localStorage.getItem('token');

  estaLogueado = (): boolean => this.getToken() !== null;

  sacarAlWeon = (): void => localStorage.removeItem('token');
}
