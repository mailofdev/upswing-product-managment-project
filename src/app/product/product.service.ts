import { Injectable, signal } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = signal<Product[]>([]);
  private nextId = signal(1);

  getProducts() {
    return this.products;
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = { ...product, id: this.nextId() };
    this.products.set([...this.products(), newProduct]);
    this.nextId.set(this.nextId() + 1);
  }

  updateProduct(updatedProduct: Product) {
    this.products.set(
      this.products().map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }

  deleteProduct(id: number) {
    this.products.set(this.products().filter((product) => product.id !== id));
  }
}
