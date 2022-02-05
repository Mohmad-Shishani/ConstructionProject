import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../shared/models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 private apiUrl: string ='https://localhost:44323/api/Companies/'

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]>{
  return this.http.get<Company[]>(this.apiUrl + 'GetCompanies');
  }

  getCompanyById(id: Number): Observable<Company> {
    return this.http.get<Company>(this.apiUrl + 'GetCompanyById/' + id)
  }

  createCompany(company: Company): Observable<any>{
    return this.http.post<Company>(this.apiUrl + 'CreateCompany', company)
  }
  editCompany(company: Company): Observable<any>{
    return this.http.put<Company>(this.apiUrl + 'EditCompany/' + company.id, company)
  }

  deleteCompany(id: Number): Observable<any>{
    return this.http.delete<Company>(this.apiUrl + 'DeleteCompany/' + id)
  }
}
