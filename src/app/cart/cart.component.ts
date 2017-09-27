import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Subscription } from 'rxjs/Subscription';
import { CartAction } from '../store/cart.actions';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {

  public cart = [];
  public totalPrice: number;
  public totalQuantity: number;
  public cartSubscription: Subscription;

  constructor(private productService:ProductsService, private cartStore: CartAction) {}

  removeProduct(product) {
    this.cartStore.removeFromCart(product)
  }

  checkout() {
    alert('Congrats you did your purchase!');
  }

  getTotalPrice() {
    let totalCost: Array<number> = []
    let quantity: Array<number> = []
    let intPrice: number
    let intQuantity: number
    this.cart.forEach((item, i) => {
      intPrice = parseInt(item.price)
      intQuantity = parseInt(item.quantity)
      totalCost.push(intPrice)
      quantity.push(intQuantity)
    })

    this.totalPrice = totalCost.reduce((acc, item) => {
      return acc += item
    }, 0)
    this.totalQuantity = quantity.reduce((acc, item) => {
      return acc += item
    }, 0)
  }

  ngOnInit() {
    this.cartSubscription = this.cartStore.getState().subscribe(res => {
      this.cart = res.products
      this.getTotalPrice()
    })
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe()
  }
  
}