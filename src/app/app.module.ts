import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TextComponent } from './components/text/text.component';
import { PriceComponent } from './components/price/price.component';
import { ActionsComponent } from './components/actions/actions.component';
import { CartComponent } from './components/cart/cart.component';
import { LogoComponent } from './components/logo/logo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalComponent } from './components/modal/modal.component';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GalleryComponent,
    TextComponent,
    PriceComponent,
    ActionsComponent,
    CartComponent,
    LogoComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
