import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GalleryComponent,
    TextComponent,
    PriceComponent,
    ActionsComponent,
    CartComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
