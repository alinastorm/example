import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventService } from './services/api-http/event.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Emitter';

  @ViewChild('emituuid', { static: false }) emituuid!: ElementRef;
  @ViewChild('emitdata', { static: false }) emitdata!: ElementRef;

  constructor(private _eventService: EventService) {  }
  
  createEvents(emituuid:any,emitdata:any) {
    this._eventService.createEvents({emituuid,emitdata});
  }
  subscribeEvents(emituuid:any) {
    this._eventService.subscribeEvents({emituuid});
  }
  getEvents(uuidEvent: string) {
    this._eventService.subscribeEvents(uuidEvent);
  }
  getUUID() {
    if (!this.emituuid) return;
    this.emituuid.nativeElement.setAttribute('value', this._eventService.getUUID());
  }
}
