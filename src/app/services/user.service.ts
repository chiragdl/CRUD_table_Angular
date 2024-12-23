import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.interface';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.getAllUsers().subscribe();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.getAll}`)
      .pipe(
        tap(users => this.usersSubject.next(users))
      );
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.create}`, user)
      .pipe(
        tap(() => this.loadUsers())
      );
  }

  updateUser(user: User): Observable<User> {
    console.log("service user values::", user)
    return this.http.put<User>(`${API_CONFIG.endpoints.update(user._id)}`, user)
      .pipe(
        tap(() => this.loadUsers())
      );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.endpoints.delete(id)}`)
      .pipe(
        tap(() => this.loadUsers())
      );
  }
}