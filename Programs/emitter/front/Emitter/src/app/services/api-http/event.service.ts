import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SHA1, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getUUID() {
    return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  }

  async subscribeEvents(body: any) {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    await this.http
      .post('http://localhost:4444', JSON.stringify(body), options)
      .toPromise();
  }
  // async unSubscribeEvents(body: any) {
  //   const options = {
  //     headers: { 'Content-Type': 'application/json' },
  //   };
  //   const events = await this.http
  //   .post('http://localhost:8800', JSON.stringify(body), options)
  //   .toPromise();
  // }
  async getEvents(uuidEvent: string) {
    const event = await this.http.get('http://localhost:4444').toPromise();
  }
  async createEvents(body: any) {
    const options = {
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' },
    };

    const events = await this.http
      .post('http://localhost:4444', JSON.stringify(body), options)
      .toPromise();
  }
}
