import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  postData<TResponse = any>(endpoint: string, data: any): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}/${endpoint}`, data);
  }

  putData<TResponse = any>(endpoint: string, data: any): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.apiUrl}/${endpoint}`, data);
  }

  deleteData<TResponse = any>(endpoint: string): Observable<TResponse> {
    return this.http.delete<TResponse>(`${this.apiUrl}/${endpoint}`);
  }

  // Function to call HTTP GET on azurefnUrl
  getAzureFunctionData() {
    return this.http.get(environment.azurefnUrl);
  }
}
