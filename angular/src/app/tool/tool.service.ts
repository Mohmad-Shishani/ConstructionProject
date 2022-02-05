import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../shared/models/Tool';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

 private apiUrl: string ='https://localhost:44323/api/Tools/'

  constructor(private http: HttpClient) { }

  getTools(): Observable<Tool[]>{
  return this.http.get<Tool[]>(this.apiUrl + 'GetTools');
  }

  getToolById(id: Number): Observable<Tool> {
    return this.http.get<Tool>(this.apiUrl + 'GetToolById/' + id)
  }

  createTool(tool: Tool): Observable<any>{
    return this.http.post<Tool>(this.apiUrl + 'CreateTool', tool)
  }
  editTool(tool: Tool): Observable<any>{
    return this.http.put<Tool>(this.apiUrl + 'EditTool/' + tool.id, tool)
  }

  deleteTool(id: Number): Observable<any>{
    return this.http.delete<Tool>(this.apiUrl + 'DeleteTool/' + id)
  }
}
