import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url + '/events');
  }

  deleteEvent(_id: string): Observable<string> {
    return this.http.delete(this.url + '/events/' + _id, {
      responseType: 'text',
    });
  }

  /*addEvent(user: User): Observable<string> {
    return this.http.post(this.url + '/events', user, {responseType: 'text'}) ;
  }

  getEvent(name: string): Observable<User> {
    return this.http.get<User>(this.url + '/events/' + name);
  }

  editEvent(name: string, user: User): Observable<string> {
    return this.http.put(this.url + '/events/' + name, user, {responseType: 'text'});
  }*/
}
