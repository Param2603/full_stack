import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from '../assets/user.png'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'

const Cart = () => {
  const { cart } = useSelector(store => store.product)

  const subTotal = cart.totalPrice
  const shipping = subTotal > 299 ? 0 : 10
  const tax = subTotal * 0.05
  const total = subTotal + shipping + tax

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const API = "http://localhost:8080/api/v1/cart"
  const accessToken = localStorage.getItem("accessToken")

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(`${API}/update`, { productId, type }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data: { productId }
      })
      if (res.data.success) {
        dispatch(setCart(res.data.cart))
        toast.success('Product removed from cart')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadCart()
  }, [dispatch])

  return (
    <div className='pt-24 bg-gray-50 min-h-screen'>
      {
        cart?.items?.length > 0 ? (
          <div className='max-w-7xl mx-auto px-4'>
            
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>
              Shopping Cart
            </h1>

            <div className='flex gap-6'>
              
              <div className='flex flex-col gap-4 flex-1'>
                {cart.items.map((product, index) => (
                  
                  <Card key={index} className="p-4 rounded-xl border shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between gap-6">

                      <div className="flex items-center gap-4 w-[350px]">
                        <img
                          src={product?.productId?.productImg?.[0]?.url || userLogo}
                          alt=""
                          className="w-20 h-20 object-cover rounded-md border"
                        />

                        <div>
                          <h1 className="font-semibold text-gray-800 text-sm truncate max-w-[220px]">
                            {product.productId.productName}
                          </h1>
                          <p className="text-gray-600 text-sm">
                            ₹{product.productId.productPrice}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => handleUpdateQuantity(product.productId._id, 'decrease')}
                          variant="outline"
                          className="w-8 h-8 p-0"
                        >
                          -
                        </Button>

                        <span className="text-sm font-medium">
                          {product.quantity}
                        </span>

                        <Button
                          onClick={() => handleUpdateQuantity(product.productId._id, 'increase')}
                          variant="outline"
                          className="w-8 h-8 p-0"
                        >
                          +
                        </Button>
                      </div>

                      <p className="text-gray-800 font-medium text-sm w-[90px] text-right">
                        ₹{product.productId.productPrice * product.quantity}
                      </p>

                      <p
                        onClick={() => handleRemove(product.productId._id)}
                        className="flex items-center gap-1 text-red-500 text-sm cursor-pointer hover:underline"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </p>
                    </div>
                  </Card>

                ))}
              </div>

              <Card className='w-[380px] rounded-xl border shadow-sm'>
                
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Order Summary
                  </CardTitle>
                </CardHeader>

                <CardContent className='space-y-3 text-sm'>

                  <div className='flex justify-between'>
                    <span>Subtotal ({cart.items.length} items)</span>
                    <span>₹ {cart.totalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>₹ {shipping}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span>Tax (5%)</span>
                    <span>₹ {tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className='flex justify-between font-semibold text-base pt-2'>
                    <span>Total</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>

                  {/* Promo */}
                  <div className='space-y-3 pt-6'>
                    <div className='flex gap-2'>
                      <Input placeholder="Promo Code" className="h-9" />
                      <Button variant='outline' className="h-9 px-4">
                        Apply
                      </Button>
                    </div>

                    <Button className='w-full bg-pink-600 hover:bg-pink-700 text-white'>
                      PLACE ORDER
                    </Button>

                    <Button variant='outline' className='w-full'>
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>

                  {/* Info */}
                  <div className='text-xs text-gray-500 pt-4 space-y-1'>
                    <p>* Free shipping on orders over ₹299</p>
                    <p>* 30-day return policy</p>
                    <p>* Secure checkout with SSL encryption</p>
                  </div>

                </CardContent>
              </Card>

            </div>
          </div>
        ) : (

          <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
            <div className='bg-pink-100 p-6 rounded-full'>
              <ShoppingCart className='w-16 h-16 text-pink-600' />
            </div>

            <h2 className='mt-6 text-2xl font-bold text-gray-800'>
              Your Cart is Empty
            </h2>

            <p className='mt-2 text-gray-600'>
              Looks like you haven't added anything yet
            </p>

            <Button
              onClick={() => navigate('/products')}
              className='mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3'
            >
              Start Shopping
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default Cart