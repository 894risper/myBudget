"use client"
import ProductContext from '@/components/context/ProductContext';
import { useRouter,useParams } from 'next/navigation';
import React from 'react';
import { useContext,useState } from 'react';



const ProductDetailsPage = () => {

    const {name} = useParams();
    const router= useRouter();

    const context = useContext(ProductContext);

    const {products,editProduct,deleteProduct} = context || {}

    const product= products.find(p=> p.product === name);

    // Local state to handle edited product name and price
  const [productName, setProductName] = useState(product?.product || '')
  const [price, setPrice] = useState(product?.price.toString() || '')

  // If no product was found, show an error message
  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>
  }

  // Handle editing the product
  const handleEdit = () => {
    // Validate inputs
    if (productName.trim() === '' || price.trim() === '' || isNaN(Number(price))) {
      alert('Please enter valid product name and price.')
      return
    }

    // Call context edit function with updated values
    editProduct(
      { product: productName.trim(), price: parseFloat(price) },
      product.product // pass old product name for reference
    )

    // Redirect back to homepage 
    router.push('/')
  }

  const handleDelete=()=>{
    deleteProduct(product.product)

    router.push('/')

  }


  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Product</h1>

      {/* Editable product name input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Editable price input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Action buttons: Save, Delete, Back */}
      <div className="flex justify-between">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default ProductDetailsPage