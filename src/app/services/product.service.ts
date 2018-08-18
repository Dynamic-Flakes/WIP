import { Product } from './../models/product';
import { CachingService } from './caching.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { pipe } from '../../../node_modules/@angular/core/src/render3/pipe';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CachingService {
  
  BASE_URL = 'http://54.183.87.149:3000/v1';

  private allProducts: Product[];

  public constructor(private http: Http) {
    super();
  }

  setAllProducts(fetchedProducts: Product[]) {
    this.allProducts = fetchedProducts;
  }

  getAllProducts() {
    return this.allProducts.slice();
  }

  public getProducts(): Observable<any> {
    return this.http.get('assets/product.json').pipe(map(res => {return res.json()}),
    catchError(this.handleError));
  }

  create(product) { 
  }

  getAll() {

  }
  
  get(productId) { 
  }

  update(productId, product) { 
  }

  delete(productId) { 
  }

    // HANDLE ALL ERRORS
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Server returned code ${error.status}, ` +
          `body was: ${error.error}`);
        if (error.status == 404) {
          return throwError('User Not Found!');
        }
      }
      return throwError('Oops, unable to complete! please try again later.');
    }
}
