import { ActionEvent, ProductActionTypes } from './../../../../state/product.state';
import { Product } from './../../../../models/product.models';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

@Input() product?: Product;
@Output() eventEmeter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product){
    this.eventEmeter.emit({type:ProductActionTypes.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product){
    this.eventEmeter.emit({type:ProductActionTypes.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product){
    this.eventEmeter.emit({type:ProductActionTypes.EDIT_PRODUCT,payload:product});
  }

}
