import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { CartAction } from './store/cart.actions';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreFrontComponent } from './store-front/store-front.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

import { ProductsService } from './services/products.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoreFrontComponent,
    ProductsComponent,
    CartComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    StoreModule.provideStore(cartReducer)
  ],
  providers: [ProductsService, CartAction, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
