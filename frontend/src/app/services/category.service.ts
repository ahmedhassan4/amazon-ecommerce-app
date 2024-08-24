import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<string>('');
  category = this.categorySubject.asObservable();

  setCategory(category: string): void {
    this.categorySubject.next(category);
  }
}
