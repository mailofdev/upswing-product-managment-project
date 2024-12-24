import { computed, Signal } from '@angular/core';
import { signalStore, withComputed, withMethods, withState, patchState } from '@ngrx/signals';
import { Product } from '../product.model';

export interface ProductState {
  products: Product[];
  selectedCategory: string | null;
  nextId: number;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: null,
  nextId: 1
};

export type ProductStore = {
  products: Signal<Product[]>;
  selectedCategory: Signal<string | null>;
  nextId: Signal<number>;
  filteredProducts: Signal<Product[]>;
  setSelectedCategory: (category: string | null) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  toggleStock: (id: number) => void;
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState<ProductState>(initialState),
  withComputed((state) => ({
    filteredProducts: computed(() => {
      const category = state.selectedCategory();
      return category
        ? state.products().filter(p => p.category === category)
        : state.products();
    })
  })),
  withMethods((store) => ({
    setSelectedCategory(category: string | null) {
      patchState(store, { selectedCategory: category });
    },

    addProduct(product: Omit<Product, 'id'>) {
      const newProduct = { ...product, id: store.nextId() };
      patchState(store, {
        products: [...store.products(), newProduct],
        nextId: store.nextId() + 1
      });
    },

    updateProduct(updatedProduct: Product) {
      patchState(store, {
        products: store.products().map((product: Product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      });
    },

    deleteProduct(id: number) {
      patchState(store, {
        products: store.products().filter((product: Product) => product.id !== id)
      });
    },

    toggleStock(id: number) {
      patchState(store, {
        products: store.products().map((product: Product) =>
          product.id === id
            ? { ...product, inStock: !product.inStock }
            : product
        )
      });
    }
  }))
);