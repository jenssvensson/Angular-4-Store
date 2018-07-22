import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CartAction } from '../store/cart.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {

  private http: HttpClient;
  public cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;

  constructor(private cartStore: CartAction) {}

  removeProduct(product) {
    this.cartStore.removeFromCart(product);
  }

  checkout() {

    const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `hello`);
        headers.append('Content-Type', 'application/json');

    let payload = {
      'order_id': '123', // TODO get next order from system backend
      'purchase_currency': 'SEK',
      'cart': {
        'items': this.cart
      },
      'checkout_settings': {
        'extended_cart': true
      },
      'require_shipping': true,
      'express_shipping': true,
      'hooks': {
        'user_return_url_on_success': 'window.location.hostname' + '/success',
        'user_return_url_on_fail': 'window.location.hostname' + '/failure'
      }
   };
    this.http.post('https://api.hips.com/v1/orders', payload);
  }

  getTotalPrice() {
    console.log(this.cart);
    const totalCost: Array<number> = [];
    const quantity: Array<number> = [];
    let intPrice: number;
    let intQuantity: number;
    this.cart.forEach((item, i) => {
      intPrice = parseInt(item.unit_price, 10);
      intQuantity = parseInt(item.quantity, 10);
      totalCost.push(intPrice);
      quantity.push(intQuantity);
    });

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item;
    }, 0);
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item;
    }, 0);
  }

  ngOnInit() {
    this.cartSubscription = this.cartStore.getState().subscribe(res => {
      this.cart = res.products;
      this.getTotalPrice();
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
