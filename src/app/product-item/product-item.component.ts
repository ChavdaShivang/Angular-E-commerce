
import { Component, Input } from '@angular/core';
import { Product } from '../product-item/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product: Product;
  constructor(private router: Router) { }

  viewProductDetails() {
    this.router.navigate(['/product', this.product._id]);
  }
}


