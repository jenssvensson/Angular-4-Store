import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartAction } from '../store/cart.actions';
import { Product } from '../models/Product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public cart: any = [];
  public totalPrice: number;
  public totalQuantity: any;
  isIn = false;

  constructor(private productService: ProductsService, private cartStore: CartAction) {}

  toggleState() { // click handler
      const bool = this.isIn;
      this.isIn = bool === false ? true : false;
  }

  getTotalPrice() {
    const totalCost: Array<number> = [];
    const quantity: Array<number> = [];
    let intPrice: number;
    let intQuantity: number;

    this.cart.products.forEach((item, i) => {
      intPrice = parseInt(item.price, 10);
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
    this.cartStore.getState().subscribe(res => {
      this.cart = res;
      this.getTotalPrice();
    });
  }
}
