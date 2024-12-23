import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  productService = inject(ProductService);
  products = this.productService.getProducts();

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  toggleStock(product: Product) {
    this.productService.updateProduct({
      ...product,
      inStock: !product.inStock,
    });
  }
}
