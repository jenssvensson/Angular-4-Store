import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';

import { AuthGuard } from './login/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoreFrontComponent,
    ProductsComponent,
    CartComponent,
    AlertComponent,
    LoginComponent,
    CheckoutComponent,
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpModule,
    StoreModule.provideStore(cartReducer)
  ],
  providers: [
    ProductsService,
    CartAction,
    AlertService,
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
