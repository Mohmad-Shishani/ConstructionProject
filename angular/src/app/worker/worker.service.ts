import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Worker } from '../shared/models/Worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

 private apiUrl: string ="https://localhost:44323/api/Workers/"

  constructor(private http: HttpClient) { }

  getWorkers(): Observable<Worker[]>{
  return this.http.get<Worker[]>(this.apiUrl + "GetWorkers");
  }

  getWorkerById(id: Number): Observable<Worker> {
    return this.http.get<Worker>(this.apiUrl + "GetWorkerById/" + id)
  }

  createWorker(worker: Worker): Observable<any>{
    return this.http.post<Worker>(this.apiUrl + "CreateWorker", worker)
  }

  editWorker(worker: Worker): Observable<any>{
    return this.http.put<Worker>(this.apiUrl + "EditWorker/" + worker.id, worker)
  }

  payWorker(id: number): Observable<any> {

    return this.http.post<Worker>(this.apiUrl + "PayWorker/" + id, null);
  }

  deleteWorker(id: Number): Observable<any>{
    return this.http.delete<Worker>(this.apiUrl + "DeleteWorker/" + id)
  }
}
