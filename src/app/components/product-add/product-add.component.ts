import { ProductsService } from './../../services/products.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray,FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  //variable form groupe
  productFormGroup? : FormGroup ;
    //   =this.fb.group({
    //   name: ["", Validators.required],
    //   price: [0, Validators.required],
    //   quantity: [0,Validators.required],
    //   selected: [true, Validators.required],
    //   available: [true, Validators.required]

    // });
  //name = new FormControl('');
  //injecter Formbuilder
submitted : boolean = false ;

  constructor(private fb:FormBuilder, private router: Router ,private productsService: ProductsService) { }

  ngOnInit(): void {
    //create reactive form

    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0,Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]

    });
  }

  onSaveProduct(){
    this.submitted = true;
    if(this.productFormGroup?.invalid) return;

    this.productsService.save(this.productFormGroup?.value)
    .subscribe(data =>{
      alert("success saving product");
    });

  }

}
