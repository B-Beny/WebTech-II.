import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

const apiUrl = 'http://localhost:3000/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  addTask(data: any): Observable<any> {
    return this._http.post(apiUrl, data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/tasks/${id}`, data);
  }

  getTaskList(): Observable<any> {
    return this._http.get(apiUrl);
  }

  deleteTask(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/tasks/${id}`);
  }
}