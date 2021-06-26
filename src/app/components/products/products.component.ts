import { AppDataState, DataStateEnum } from './../../state/product.state';
import { Observable , of } from 'rxjs';
import { catchError,startWith , map } from 'rxjs/operators';
import { Product } from './../../models/product.models';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
//import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ : Observable<AppDataState<Product[]>> | null=null  ;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.productsService.getAllProducts()
    .pipe(
      map( data=>({dataState : DataStateEnum.LOADED , data : data}) ),
      startWith({dataState : DataStateEnum.LOADING}),
      catchError( err => of({ dataState :DataStateEnum.ERROR , errorMessage : err.message}))

    );}

    onSelectedProducts(){
      this.products$ = this.productsService.getSelectedProducts()
      .pipe(
        map( data=>({dataState : DataStateEnum.LOADED , data : data}) ),
        startWith({dataState : DataStateEnum.LOADING}),
        catchError( err => of({ dataState :DataStateEnum.ERROR , errorMessage : err.message}))

      );}

      onAvailableProducts(){
        this.products$ = this.productsService.getAvailableProducts()
        .pipe(
          map( data=>({dataState : DataStateEnum.LOADED , data : data}) ),
          startWith({dataState : DataStateEnum.LOADING}),
          catchError( err => of({ dataState :DataStateEnum.ERROR , errorMessage : err.message}))

        );}

        onSearch(dataForm : any){
          this.products$ = this.productsService.searchProducts(dataForm.keyword)
          .pipe(
            map( data=>({dataState : DataStateEnum.LOADED , data : data}) ),
            startWith({dataState : DataStateEnum.LOADING}),
            catchError( err => of({ dataState :DataStateEnum.ERROR , errorMessage : err.message}))

          );}

          onSelect(p:Product){
            this.productsService.select(p)
            .subscribe(data => {
              this.onGetAllProducts();
            }

            )


          }







}
