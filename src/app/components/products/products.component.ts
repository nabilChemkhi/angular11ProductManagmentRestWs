import { AppDataState, DataStateEnum, ProductActionTypes, ActionEvent } from './../../state/product.state';
import { Observable , of } from 'rxjs';
import { catchError,startWith , map } from 'rxjs/operators';
import { Product } from './../../models/product.models';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ : Observable<AppDataState<Product[]>> | null=null  ;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService : ProductsService ,private router : Router) { }

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
              //this.onGetAllProducts();
              p.selected = data.selected;
            }

            );}


            onDelete(p:Product){

              let v = confirm("êtes vous sûre?") //dialogue de confirmation
              if (v==true)
              this.productsService.delte(p)
              .subscribe(data => {
                this.onGetAllProducts();

              }

              );}

              onANewProducts(){
                this.router.navigateByUrl("/newProduct")

              }


              onEdit(p : Product){
                this.router.navigateByUrl("/editProduct/" + p.id);
              }




              // onActionEvent($event: ProductActionTypes){
                // if ($event == "ALL_PRODUCTS"){
                //   this.onGetAllProducts();
                // }
                onActionEvent($event: ActionEvent){
                switch($event.type){
                  case ProductActionTypes.GET_ALL_PRODUCTS:
                       this.onGetAllProducts(); break;

                  case ProductActionTypes.GET_SELECTED_PRODUCTS:
                       this.onSelectedProducts(); break;

                 case ProductActionTypes.GET_AVAILABLE_PRODUCTS:
                        this.onAvailableProducts(); break;

                  case ProductActionTypes.SEARCH_PRODUCTS:
                          this.onSearch($event.payload); break;

                 case ProductActionTypes.NEW_PRODUCT:
                            this.onANewProducts(); break;


                  //product list component events handling
                  //products_list_events
                  case ProductActionTypes.DELETE_PRODUCT:
                  this.onDelete($event.payload); break;

                  case ProductActionTypes.EDIT_PRODUCT:
                  this.onEdit($event.payload); break;

                  case ProductActionTypes.SELECT_PRODUCT:
                  this.onSelect($event.payload); break;


                }




              }





}
