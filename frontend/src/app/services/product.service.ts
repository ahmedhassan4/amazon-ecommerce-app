import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { IProduct } from '../models/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private baseUrl = 'https://fakestoreapi.com/products';
  private baseUrl = 'http://localhost:3000/products'; //json server

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}`);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/?category=${category}`);
  }

  getCombinedClothingProducts(): Observable<any[]> {
    
    const menClothing$ = this.getProductsByCategory("men's clothing");
    const womenClothing$ = this.getProductsByCategory("women's clothing");

    return forkJoin([menClothing$, womenClothing$]).pipe(
      map(([menClothing, womenClothing]) => [...menClothing, ...womenClothing])
    );
  }
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  rateProduct(productId: number, rating: number): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.baseUrl}/${productId}/rate`, {
      rating,
    });
  }
}
