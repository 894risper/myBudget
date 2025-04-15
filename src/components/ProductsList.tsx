import React, { useContext } from 'react'
import ProductContext from './context/ProductContext'
import Link from 'next/link'
import {FaTrash,FaEdit} from "react-icons/fa"

const ProductsList = () => {
  const context = useContext(ProductContext)
  const { products } = context || {}

  if (!products ) {
    return <h2 className='text-fuchsia-400'>No products found</h2>
  }

  const totalPrice = products.reduce((sum, item) => sum + Number(item.price), 0)


  return (
    <div className='md:ml-6'>
      <h2 className='text-xl font-bold text-center text-blue-400 mb-4'>Products List</h2>
      <div className="max-h-80 overflow-y-auto border rounded-md shadow-sm">

        <table className='min-w-full border border-gray-300 text-left'>
          <thead className='bg-fuchsia-300'>
            <tr>
              <th className="px-4 py-2 border"></th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Price (Ksh)</th>
              <th className='px-4 py-2 border '>Edit</th>
              <th className='px-4 py-2 border '>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td className='px-4 py-2 border'>{index + 1}</td>
                <td className="px-4 py-2 border">{item.product}</td>
                <td className="px-4 py-2 border">Ksh {item.price}</td>
                <td className='px-4 py-2 border'>
                <Link
                href={`/products/${item.product}`}
                className="text-blue-600 hover:underline"
              >
                <FaEdit/>
              </Link>   
                </td>
                <td className='px-4 py-2 border'>
                <Link
                href={`/products/${item.product}`}
                className="text-blue-600 hover:underline"
              >
              <FaTrash/>
              </Link>   
                </td>

              </tr>
            ))}
            <tr className='font-semibold bg-purple-50'>
              <td colSpan={4} className='px-4 py-2 border text-right'>Total</td>
              <td className='px-4 py-2 border text-purple-700'>Ksh {totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsList
