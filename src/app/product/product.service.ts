import { Injectable, computed, signal } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = signal<Product[]>([]);
  private nextId = signal(1);
  private selectedCategory = signal<string | null>(null);

  // Computed signal for filtered products
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    return category
      ? this.products().filter(p => p.category === category)
      : this.products();
  });

  getProducts() {
    return this.products;
  }

  getFilteredProducts() {
    return this.filteredProducts;
  }

  setSelectedCategory(category: string | null) {
    this.selectedCategory.set(category);
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct = { ...product, id: this.nextId() };
    this.products.update(products => [...products, newProduct]);
    this.nextId.update(id => id + 1);
  }

  updateProduct(updatedProduct: Product) {
    this.products.update(products =>
      products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }

  deleteProduct(id: number) {
    this.products.update(products => 
      products.filter(product => product.id !== id)
    );
  }

  toggleStock(id: number) {
    this.products.update(products =>
      products.map(product =>
        product.id === id 
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
  }
}