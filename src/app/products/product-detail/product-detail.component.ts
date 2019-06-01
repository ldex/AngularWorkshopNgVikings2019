import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../product.interface";
import { ProductService } from "src/app/services/product.service";
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    if(id) {
      this
      .productService
      .getProductById(id)
      .subscribe(
        result => this.product = result
      )
    }

  }
}
