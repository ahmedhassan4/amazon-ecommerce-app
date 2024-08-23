import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/category/${category}`);
  }

getCombinedClothingProducts(): Observable<any[]> {
  const menClothing$ = this.getProductsByCategory('men\'s clothing');
  const womenClothing$ = this.getProductsByCategory('women\'s clothing');

  return forkJoin([menClothing$, womenClothing$]).pipe(
    map(([menClothing, womenClothing]) => [...menClothing, ...womenClothing])
  );
}
}