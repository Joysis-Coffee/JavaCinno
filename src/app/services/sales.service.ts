import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, map, Observable, throwError} from "rxjs";
import {dashboardModel} from "./model/dashboard-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_CONFIG, EndpointKey} from "./api/api.config";
import {catchError, tap} from "rxjs/operators";
import {SalesModel} from "./model/sales.model";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private salesSubject = new BehaviorSubject<dashboardModel[]>([]);
  public sales$ = this.salesSubject.asObservable();

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
    return this.httpClient.get<dashboardModel[]>(this.getFullApiUrl('sales'))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(transactions: any): Observable<dashboardModel> {
    return this.httpClient.post<dashboardModel>(this.getFullApiUrl('sales'), JSON.stringify(transactions), this.httpOptions)
      .pipe(
        tap(() => this.refresh()),
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<dashboardModel> {
    return this.httpClient.get<dashboardModel>(`${this.getFullApiUrl('sales')}${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /**
   * GEt sales where transaction = transaction_id
   */

  getSalesByTransaction(transactionId: number): Observable<SalesModel[]> {
    return this.httpClient.get<SalesModel[]>(`${this.getFullApiUrl('sales')}${transactionId}`);
  }


  getTransactionWithDetails(transactionId: number): Observable<dashboardModel> {
    return forkJoin({
      transaction: this.httpClient.get<dashboardModel>(`${this.getFullApiUrl('transaction')}${transactionId}`),
      salesItems: this.httpClient.get<SalesModel[]>(`${this.getFullApiUrl('sales')}${transactionId}`)
    }).pipe(
      map(response => {
        const dashboardData = response.transaction;
        dashboardData.salesItems = response.salesItems;
        return dashboardData;
      })
    );
  }


  fetch() {
    this.httpClient.get<dashboardModel[]>(`${this.getFullApiUrl('sales')}`).subscribe(
      transactions => this.salesSubject.next(transactions),
      error => console.error('Error fetching data', error)
    );
  }


  refresh(): void {
    this.getAll().subscribe(
      data => this.salesSubject.next(data),
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
