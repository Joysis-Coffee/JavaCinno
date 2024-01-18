import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CategoryModel } from './categoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL = "http://127.0.0.1:8081/api/v1";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.apiURL + '/products/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(category:any): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.apiURL + '/products/', JSON.stringify(category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:number): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(this.apiURL + '/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, category:any): Observable<CategoryModel> {
    return this.httpClient.put<CategoryModel>(this.apiURL + '/products/' + id, JSON.stringify(category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete<CategoryModel>(this.apiURL + '/products/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
