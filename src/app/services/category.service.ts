import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductModel } from './model/product-model';
import {API_CONFIG, EndpointKey} from "./api/api.config";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<ProductModel[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

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

  getAll(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.getFullApiUrl('products'))
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(category: any): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(this.getFullApiUrl('products'), JSON.stringify(category), this.httpOptions)
      .pipe(
        tap(() => this.refreshCategoriesList()),
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.getFullApiUrl('products')}${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, category: any): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${this.getFullApiUrl('products')}${id}`, JSON.stringify(category), this.httpOptions)
      .pipe(
        tap(() => this.refreshCategoriesList()),
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.getFullApiUrl('products')}${id}`, this.httpOptions)
      .pipe(
        tap(() => this.refreshCategoriesList()),
        catchError(this.errorHandler)
      );
  }


  fetchCategories() {
    this.httpClient.get<ProductModel[]>(`${this.getFullApiUrl('products')}`).subscribe(
      categories => this.categoriesSubject.next(categories),
      error => console.error('Error fetching categories', error)
    );
  }


  refreshCategoriesList(): void {
    this.getAll().subscribe(
      categories => this.categoriesSubject.next(categories),
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
