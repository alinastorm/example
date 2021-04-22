import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { config } from './api/webSocket';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: config, useValue: {
            url: environment.ws
        } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
