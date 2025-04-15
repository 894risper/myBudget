'use client'
import { useState ,useEffect} from "react"
import ProductContext from "./ProductContext"
type Product={
    product:string
    price:number
}

const ProductContextProvoder=({children}:{children:React.ReactNode})=>{
    //STATE TO HOLD THE LIST OF PRODUCTS
    const [products,setProducts]= useState<Product[]>([]);

    // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("products")
    if (stored) {
      setProducts(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])




    // fuction to add a new product to the list

    const addProduct=(product:Product)=>{
        setProducts(prev=>[...prev,product])
    }

// function to edit an existing product

const editProduct=(updated:Product , oldProductName:string)=>{
    setProducts(prev =>
        prev.map(p => (p.product === oldProductName ? updated : p)) // Replace the matching product
      )

}

// delete
const deleteProduct= (productName:String)=>{
    setProducts(prev=>prev.filter(p=>p.product !== productName))
}
return (
    <ProductContext.Provider value={{products,addProduct,editProduct,deleteProduct}}>
        {children}


    </ProductContext.Provider>
)
}

export default ProductContextProvoder