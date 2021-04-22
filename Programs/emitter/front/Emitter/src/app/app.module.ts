import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventService } from './services/api-http/event.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { WebsocketModule } from './services/api-webSocket/websocket.module';
import { SocketComponent } from './socket/socket.component';
import { config } from './services/api-webSocket';

@NgModule({
  declarations: [AppComponent, SocketComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    // WebsocketModule.config({
    //     url: environment.ws
    // }),
    ReactiveFormsModule,
  ],
  providers: [EventService,
     { provide: config, useValue: {
        url: environment.ws
    } }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
