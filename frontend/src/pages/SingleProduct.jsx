import ProductDesc from '@/components/ProductDesc'
import ProductImg from '@/components/ProductImg'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import axios from 'axios'

const SingleProduct = () => {
    const params = useParams()
    const productId = params.id
    const {products} = useSelector(store => store.product)
    const [product, setProduct] = useState(products.find((item) => item._id === productId) || null)
    const [loading, setLoading] = useState(!product)

    useEffect(() => {
        // If product not in Redux store (direct URL access), fetch from API
        if (!product) {
            const fetchProduct = async () => {
                try {
                    setLoading(true)
                    const res = await axios.get(`http://localhost:8080/api/v1/product/getproduct/${productId}`)
                    if (res.data.success) {
                        setProduct(res.data.product)
                    }
                } catch (error) {
                    console.error('Error fetching product:', error)
                } finally {
                    setLoading(false)
                }
            }
            fetchProduct()
        }
    }, [productId])

    if (loading) {
        return <div className='pt-25 py-10 max-w-7xl mx-auto text-center text-gray-500'>Loading product...</div>
    }

    if (!product) {
        return <div className='pt-25 py-10 max-w-7xl mx-auto text-center text-red-500'>Product not found.</div>
    }

  return (
    <div className='pt-25 py-10 max-w-7xl mx-auto'>
        <Breadcrumb product={product}/>
        <div className='mt-10 grid grid-cols-2 items-start'>
            {product?.productImg?.length > 0 && <ProductImg images={product.productImg}/>}
            <ProductDesc product={product}/>
        </div>
    </div>
  )
}

export default SingleProduct