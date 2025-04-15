"use client"
import { createContext } from "react";

type Product={
    product:string
    price:number
};

type ProductContextType={
   products:Product[] ;
   addProduct:(product: Product)=>void
   editProduct:(updated:Product,oldProductName:string)=>void
   deleteProduct:(productName:string)=>void
}

const ProductContext = createContext<ProductContextType>({
    products:[],
    addProduct: () => {},
    editProduct:()=>{},
    deleteProduct:()=>{}
    

});

export default ProductContext;