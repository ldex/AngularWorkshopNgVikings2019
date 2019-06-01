import { Injectable } from "@angular/core";
import { Product } from "../products/product.interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, shareReplay, flatMap, first } from "rxjs/operators";

@Injectable()
export class ProductService {

  private baseUrl: string =
    "http://storerestservice.azurewebsites.net/api/products/";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this
            .http
            .get<Product[]>(this.baseUrl)
            .pipe(
              shareReplay(),
              catchError(this.handleError)
            );
  }

  getProductById(id: number): Observable<Product> {
    return this
            .getProducts()
            .pipe(
              flatMap(p => p),
              first(product => product.id == id),
              catchError(this.handleError)
            )
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMsg: string;
    if (errorResponse.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = "An error occurred:" + errorResponse.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMsg = `Backend returned code ${errorResponse.status}, body was: ${
        errorResponse.error
      }`;
    }
    console.error(errorMsg);
    return throwError(errorMsg);
  }
}
