import { Observable } from 'rxjs';
import { Product } from './../../../models/product.models';
import { DataStateEnum, AppDataState, ActionEvent, ProductActionTypes } from './../../../state/product.state';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
@Input() productInput$ : Observable<AppDataState<Product[]>> | null=null  ;
@Output() productsEventEmetter: EventEmitter<ActionEvent>= new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(p: any){
    this.productsEventEmetter.emit({type:ProductActionTypes.EDIT_PRODUCT, payload: p})
  }

  onSelect(p: Product){
    this.productsEventEmetter.emit({type:ProductActionTypes.SELECT_PRODUCT, payload: p});
  }

  onDelete(p: any){
    this.productsEventEmetter.emit({type:ProductActionTypes.DELETE_PRODUCT, payload: p})
  }

  onActionEvent($event: ActionEvent){
    this.productsEventEmetter.emit($event);
  }

}
