import { Component } from '@angular/core';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
