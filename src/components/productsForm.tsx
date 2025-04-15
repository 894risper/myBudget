'use client'
import React, { useContext } from 'react'
import {useForm} from "react-hook-form"
import { useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import ProductContext from './context/ProductContext'
import ProductsList from './ProductsList'


type InputType ={
    product:string;
    price:number
}

const ProductsForm = () => {
    const {register,handleSubmit,reset,formState}=useForm<InputType>();

    const context =useContext(ProductContext);

    const {addProduct}= context ||{}

    useEffect(()=>{
        reset({product:""})
    },[reset]);
    const handleFormSubmit=(data:InputType)=>{

        if(addProduct){
            addProduct(data)
        }
        reset()
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
<h2 className='font-semibold text-fuchsia-500'>BUDGET APP</h2>
<div className=' sm:p-4 md:flex justify-between border border-gray-300 p-4 rounded-md shadow-md '>
    
     <div>
        <h2 className='text-xl font-bold  text-blue-400 mb-4'> Products Form</h2>   
    <div className='shadow-lg border-t-4 border-fuchsia-300 p-5 rounded-lg'>
       
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <label htmlFor="product">Product</label>
                <Input type='text' 
                placeholder='product'
                {...register("product",{
                    required:"the product name is required",
                    pattern:{
                        value:/^[a-zA-Z]+$/,
                            message:" product name should only contain letters"
                    }
                })}
                />
                    {formState.errors.product &&
                    <p className='text-red-500'>
                        {formState.errors.product.message}
                    </p>
                    }
               
            </div>

            <div>

                <label htmlFor="price">Price</label>

                <Input type='text'
                placeholder='price'
                {...register("price",{
                    required:"the price is required",

                    pattern:{
                        value:/^[0-9]+$/,
                        message:"the price should only contain numbers"
                    }
                })}
                
                />
                {formState.errors.price && 
                <p className='text-red-500'>
                    {formState.errors.price.message}
                </p>
                }
               
            </div>

            <Button className='mt-2  '>Add Product</Button>



        </form>
    </div>
    </div>
    <ProductsList/>
</div>

</div>
    
  )
}

export default ProductsForm