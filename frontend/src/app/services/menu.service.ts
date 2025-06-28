import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) { }

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  updateMenu(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menu);
  }

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMenusByStatus(active: boolean): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/status/${active}`);
  }
}