import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  productService = inject(ProductService);
  formBuilder = inject(FormBuilder);

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required],
    inStock: [false],
  });

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value);
      this.productForm.reset();
    }
  }
}
