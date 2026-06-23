import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateIdeaDto, Idea } from '../models/idea';

@Injectable({ providedIn: 'root' })
export class IdeaService {
  private readonly apiURL: string = 'http://localhost:5078/api/Idea';

  constructor(private http: HttpClient) {}

  getIdeas = (): Observable<Idea[]> => this.http.get<Idea[]>(this.apiURL);

  createIdea = (dto: CreateIdeaDto): Observable<Idea> => this.http.post<Idea>(this.apiURL, dto);
}
