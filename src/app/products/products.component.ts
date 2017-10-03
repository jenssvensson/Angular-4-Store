import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';
import { CartAction } from '../store/cart.actions';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  quantity: number;
  sortby = 'name';

  constructor(private productService: ProductsService, private alertService: AlertService, private router: Router, private cartStore: CartAction) { }

  ngOnInit() {
    this.getProductData()
  }

  getProductData() {
    this.productService.getProducts().then(products => this.products = products)
  }

  // When add to cart button is clicked
  addToCart(product) {
    this.cartStore.addToCart(product, this.quantity || 1)
    this.alertService.success("Added " + product.name + " to cart.");
  }

  public sort() {
    this.products.sort(this.dynamicSort(this.sortby));
  }

  public dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}

