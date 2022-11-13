import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/notes/';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any> {
    return this.http.get(API_URL, {responseType: 'json'})
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(API_URL + `${id}`);
  }

  updateNote(note: any): Observable<any> {
    return this.http.put(API_URL, note);
  }

  createNote(note: any): Observable<any> {
    return this.http.post(API_URL, note);
  }

  addEditor(id: number, username: string): Observable<any> {
    return this.http.post(API_URL + `${id}/editors`, [{username}]);
  }
}
