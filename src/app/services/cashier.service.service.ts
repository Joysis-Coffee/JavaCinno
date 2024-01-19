import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {API_CONFIG, EndpointKey} from "./api/api.config";
import {cashierModel} from "./model/cashier-model";
import {BehaviorSubject, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private cashierSubject = new BehaviorSubject<cashierModel[]>([]);
  public cashiers$ = this.cashierSubject.asObservable();

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

  getAll(): Observable<cashierModel[]> {
    return this.httpClient.get<cashierModel[]>(this.getFullApiUrl('cashier'))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(cashiers: any): Observable<cashierModel> {
    return this.httpClient.post<cashierModel>(this.getFullApiUrl('cashier'), JSON.stringify(cashiers), this.httpOptions)
      .pipe(
        tap(() => this.refreshCategoriesList()),
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<cashierModel> {
    return this.httpClient.get<cashierModel>(`${this.getFullApiUrl('cashier')}${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, cashiers: any): Observable<cashierModel> {
    return this.httpClient.put<cashierModel>(`${this.getFullApiUrl('cashier')}${id}`, JSON.stringify(cashiers), this.httpOptions)
      .pipe(
        tap(() => this.refreshCategoriesList()),
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.getFullApiUrl('cashier')}${id}`, this.httpOptions)
      .pipe(
        tap(() => this.refreshCategoriesList()),
        catchError(this.errorHandler)
      );
  }


  fetchCategories() {
    this.httpClient.get<cashierModel[]>(`${this.getFullApiUrl('cashier')}`).subscribe(
      cashiers => this.cashierSubject.next(cashiers),
      error => console.error('Error fetching categories', error)
    );
  }


  refreshCategoriesList(): void {
    this.getAll().subscribe(
      categories => this.cashierSubject.next(categories),
      error => console.error('Error fetching categories', error)
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
