import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-item/product.service';
import { Product } from '../product-item/product.model';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartService } from '../cart/cart.service';
import { User } from '../product-item/user.model';
import { UserService } from '../product-item/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Product | undefined;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(
        (data: Product) => {
          this.product = data;
        },
        (error) => {
          console.error('Error fetching product details', error);
        }
      );
    }
    this.http
      .get('http://localhost:5000/api/users/find/', {
        withCredentials: true,
        headers: {
          token: `Bearer ${localStorage.getItem('accessToken') ?? ''}`,
        },
      })
      .subscribe((res: any) => {
        this.user = res;
      });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product._id, 1, this.user?._id).subscribe(
        () => {
          Swal.fire('Success', 'Product added to cart', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Failed to add product to cart', 'error');
        }
      );
    }
  }
}
