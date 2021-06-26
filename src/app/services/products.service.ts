import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({providedIn: "root"})
export class ProductsService{

   //host = "http://localhost:3000/";
   host = environment.host;
  constructor(private http : HttpClient){

  }

  getAllProducts() : Observable<Product[]>{
    //let host = environment.host;
    //let host = "http://localhost:3000";
    return this.http.get<Product[]>(this.host + "/products");
  }

  getSelectedProducts() : Observable<Product[]>{
   // let host = environment.host;
  // let host = "http://localhost:3000/";
    return this.http.get<Product[]>(this.host + "/products?selected=true");
  }

  getAvailableProducts() : Observable<Product[]>{
    //let host = environment.host;
    //let host = "http://localhost:3000/";
    return this.http.get<Product[]>(this.host + "/products?available=true");
  }

  searchProducts(keyword : string) : Observable<Product[]>{
    //let host = environment.host;
    //let host = "http://localhost:3000/";
    return this.http.get<Product[]>(this.host + "/products?name_like=" + keyword);
  }

  select(product : Product) : Observable<Product[]>{
    //let host = environment.host;
    //let host = "http://localhost:3000/";
    product.selected = !product.selected;
    return this.http.put<Product[]>(this.host + "/products/"+product.id  ,product);
  }


}
