import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../shared/models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string= 'https://localhost:44323/api/Projects/'

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.apiUrl + 'GetProjects');
    }
  
    getProjectById(id: Number): Observable<Project> {
      return this.http.get<Project>(this.apiUrl + 'GetProjectById/' + id)
    }
  
    createProject(project: Project): Observable<any>{
      return this.http.post<Project>(this.apiUrl + 'CreateProject', project)
    }
    editProject(project: Project): Observable<any>{
      return this.http.put<Project>(this.apiUrl + 'EditProject/' + project.id, project)
    }
  
    deleteProject(id: Number): Observable<any>{
      return this.http.delete<Project>(this.apiUrl + 'DeleteProject/' + id)
    }
}
