
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product-item/product.service';
import { Product } from '../product-item/product.model';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../product-item/user.model';
import { NgFor, NgIf } from '@angular/common';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  user: User;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log(`Bearer ${localStorage.getItem('accessToken') ?? ''}`)
    this.http
      .get('http://localhost:5000/api/users/find', {
        withCredentials: true,
        headers: {
          token: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
        },
      })
      .subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        this.loadCart();
      });
    
    
  }

  loadCart(): void {
    this.cartService.getCart(this.user._id).subscribe(cart => {
      const productObservables: Observable<Product>[] = [];
      console.log("Hey", cart);
      cart.products.forEach((cartProduct: any) => {
        productObservables.push(this.productService.getProductById(cartProduct.productId));
      });
      forkJoin(productObservables).subscribe(products => {
        this.cartItems = products.map((product, index) => ({
          product,
          quantity: cart.products[index].quantity
        }));
      });
    });
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
      Swal.fire('Success', 'Product removed from cart', 'success');
    });
  }
}

