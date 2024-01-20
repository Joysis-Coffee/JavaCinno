import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {API_CONFIG, EndpointKey} from "./api/api.config";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {dashboardModel} from "./model/dashboard-model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardSubject = new BehaviorSubject<dashboardModel[]>([]);
  public transactions$ = this.dashboardSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Use the API configuration for HTTP requests
  private getFullApiUrl(endpoint: EndpointKey): string {
    return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
  }

  getAll(): Observable<dashboardModel[]> {
    return this.httpClient.get<dashboardModel[]>(this.getFullApiUrl('transaction'))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(transactions: any): Observable<dashboardModel> {
    return this.httpClient.post<dashboardModel>(this.getFullApiUrl('transaction'), JSON.stringify(transactions), this.httpOptions)
      .pipe(
        tap(() => this.refresh()),
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<dashboardModel> {
    return this.httpClient.get<dashboardModel>(`${this.getFullApiUrl('transaction')}${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  fetch() {
    this.httpClient.get<dashboardModel[]>(`${this.getFullApiUrl('transaction')}`).subscribe(
      transactions => this.dashboardSubject.next(transactions),
      error => console.error('Error fetching data', error)
    );
  }


  refresh(): void {
    this.getAll().subscribe(
      data => this.dashboardSubject.next(data),
      error => console.error('Error fetching data', error)
    );
  }

  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
