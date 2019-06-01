import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Product } from "../product.interface";
import { ProductService } from "src/app/services/product.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  title = "Products";
  //  products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  error: string;

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl("products/" + product.id);
  }

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts().pipe(
      catchError(error => {
        this.error = error;
        return of(null);
      })
    );
  }
}
