import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IdeaService } from '../../services/idea.service';
import { CreateIdeaDto, Idea } from '../../models/idea';

@Component({
  selector: 'app-ideas',
  imports: [FormsModule, CommonModule],
  templateUrl: './ideas.html',
  styleUrl: './ideas.scss',
})
export class Ideas implements OnInit {
  ideas: Idea[] = [];
  title: string = '';
  description: string = '';
  category: string = '';
  errorMessage: string = '';

  constructor(
    private ideaService: IdeaService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ideaService.getIdeas().subscribe({
      next: (ideas) => (this.ideas = ideas),
      error: (err) => {
        if (err.status === 401) {
          this.authService.sacarAlWeon();
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'No se pudieron cargar las ideas. ¿El backend está corriendo?';
        }
      },
    });
  }

  onCreateIdea = (): void => {
    const dto: CreateIdeaDto = {
      title: this.title,
      description: this.description,
      category: this.category,
    };

    this.ideaService.createIdea(dto).subscribe({
      next: (idea) => {
        this.ideas.unshift(idea);
        this.title = '';
        this.description = '';
        this.category = '';
      },
      error: (err) => console.error('Error al crear idea', err),
    });
  };

  onLogout = (): void => {
    this.authService.sacarAlWeon();
    this.router.navigate(['/login']);
  };
}
