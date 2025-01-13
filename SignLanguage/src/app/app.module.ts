import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {VideoComponent} from './video-component/video.component';
import {AvatarComponent} from './avatar-component/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
      VideoComponent,
      AvatarComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
