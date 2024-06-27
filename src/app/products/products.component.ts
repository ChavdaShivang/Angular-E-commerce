
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-item/product.service';
import { Product } from '../product-item/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemComponent, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    }, error => {
      console.error('Error fetching products', error);
    });
  }
}

