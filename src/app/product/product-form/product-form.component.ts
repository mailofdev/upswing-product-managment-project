// src/app/product/product-form/product-form.component.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ProductStore } from '../store/product.store';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  private productStore = inject(ProductStore);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  categories = ['Electronics', 'Clothing', 'Books'];

  productForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    inStock: [true],
  });

  onSubmit() {
    if (this.productForm.valid) {
      this.productStore.addProduct(this.productForm.value);
      this.snackBar.open('Product added successfully', 'Close', {
        duration: 2000,
      });
  
      // Reset form
      this.productForm.patchValue({
        name: '',
        price: null,
        category: '',
        inStock: true
      });
  
      // Reset form state
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        control?.markAsUntouched();
        control?.markAsPristine();
        control?.setErrors(null);
      });
    }
  }
}