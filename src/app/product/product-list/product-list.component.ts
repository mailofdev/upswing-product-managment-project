import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../product.model';
import { ProductEditDialogComponent } from '../product-edit-dialog.component';
import { ProductStore } from '../store/product.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  private productStore = inject(ProductStore);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  products = this.productStore.filteredProducts;
  categories: string[] = ['Electronics', 'Clothing', 'Books'];
  displayedColumns: string[] = ['name', 'price', 'category', 'inStock', 'actions'];

  toggleStock(product: Product): void {
    this.productStore.toggleStock(product.id);
    const status = product.inStock ? 'out of stock' : 'in stock';
    this.snackBar.open(
      `Product ${product.name} marked as ${status}`,
      'Close',
      { duration: 3000 }
    );
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productStore.updateProduct(result);
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000
        });
      }
    });
  }

  deleteProduct(product: Product): void {
    this.productStore.deleteProduct(product.id);
    this.snackBar.open(`Product ${product.name} deleted`, 'Close', {
      duration: 3000,
    });
  }

  onCategoryChange(category: string | null): void {
    this.productStore.setSelectedCategory(category);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Electronics': 'primary',
      'Clothing': 'accent',
      'Books': 'warn'
    };
    return colors[category] || 'primary';
  }
}