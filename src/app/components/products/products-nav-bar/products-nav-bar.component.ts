import { ProductActionTypes, ActionEvent } from './../../../state/product.state';
import { Product } from './../../../models/product.models';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitte : EventEmitter<ActionEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onGetAllProducts(){
    // this.productEventEmitte.emit(ProductActionTypes.GET_ALL_PRODUCTS);
    // this.productEventEmitte.emit({type: ProductActionTypes.GET_ALL_PRODUCTS, payload: null});
    this.productEventEmitte.emit({type: ProductActionTypes.GET_ALL_PRODUCTS});
  }

  onSelectedProducts(){
    this.productEventEmitte.emit({type: ProductActionTypes.GET_SELECTED_PRODUCTS});
  }

  onAvailableProducts(){
    this.productEventEmitte.emit({type: ProductActionTypes.GET_AVAILABLE_PRODUCTS});
  }

  onANewProducts(){
    this.productEventEmitte.emit({type: ProductActionTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any){
    this.productEventEmitte.emit({type: ProductActionTypes.SEARCH_PRODUCTS, payload: dataForm});
  }
}
