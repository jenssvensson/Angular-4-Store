import { Injectable } from '@angular/core';
import { PRODUCTS } from '../models/product-data';
import { Product } from '../models/Product'; 
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor() { }

  getProducts() {
      return Promise.resolve(PRODUCTS)
  }

  getProduct(id) {
    return this.getProducts()
      .then(products => products.find(product => product.id === id))
  }
}
