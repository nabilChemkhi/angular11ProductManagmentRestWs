import { Product } from './../models/product.models';
export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR,
}

export interface AppDataState<T>{
  dataState? : DataStateEnum,
  data? : T ,
  errorMessage? : string

}


export enum ProductActionTypes{
  GET_ALL_PRODUCTS = "[Prpduct] get all products",
  GET_SELECTED_PRODUCTS = "[Prpduct] get selcted products",
  GET_AVAILABLE_PRODUCTS = "[Prpduct] get available products",
  SEARCH_PRODUCTS = "[Prpduct] search products",
  NEW_PRODUCT = "[Prpduct] new product",
  SELECT_PRODUCT = "[Prpduct] select product",
  EDIT_PRODUCT = "[Prpduct] edit product",
  DELETE_PRODUCT = "[Prpduct] delete product",
}

export interface ActionEvent{
  type: ProductActionTypes,
  payload?: any,
}
