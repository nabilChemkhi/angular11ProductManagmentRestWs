import { Product } from './../../models/product.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  //pour récuperer l'id depuis l'URL à l'aide d'acitated route
  productId? : number;
   submitted? : boolean = false;
  productFormGroup? : FormGroup;
  constructor(private activatedRoute : ActivatedRoute,
              private productService :ProductsService,
              private fb :FormBuilder) {
    //pour récuperer l'id depuis l'URL à l'aide d'acitated route
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
    .subscribe(product => {
      this.productFormGroup=this.fb.group({
      id : [product.id , Validators.required],
      name : [product.name , Validators.required],
      price : [product.price , Validators.required],
      quantity : [product.quantity , Validators.required],
      selected : [product.selected , Validators.required],
      available : [product.available , Validators.required]
    })

    })
  }

  onUpdateProduct(){
    this.productService.updateProduct(this.productFormGroup?.value)
    .subscribe(data=>{
      alert('success updating')
    })
  }

}
