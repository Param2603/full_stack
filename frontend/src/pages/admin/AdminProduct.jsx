import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Edit, Search, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/imageUpload'
import axios from 'axios'
import { toast } from 'sonner'
import { setProducts } from '@/redux/productSlice'


const AdminProduct = () => {
  const {products} = useSelector(store => store.product)
  const [editProduct, setEditProduct] = useState(null)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()

  let filteredProducts = products.filter((product) => 
    product.productName.toLowerCase().includes(search.toLowerCase()) ||
  product.brand.toLowerCase().includes(search.toLowerCase()) ||
  product.category.toLowerCase().includes(search.toLowerCase()) 
  )

  const handleChange = (e) => {
    const {name, value} = e.target
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if(sortOrder === 'lowToHigh'){
    filteredProducts = [...filteredProducts].sort((a,b) => a.productPrice - b.productPrice)
  }
  if(sortOrder === 'highToLow'){
    filteredProducts = [...filteredProducts].sort((a,b) => b.productPrice - a.productPrice)
  }

  const handleSave = async(e) => {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append("productName", editProduct.productName)
    formdata.append("productDesc", editProduct.productDesc)
    formdata.append("productPrice", editProduct.productPrice)
    formdata.append("category", editProduct.category)
    formdata.append("brand", editProduct.brand)

    //Add Existing Images
    const existingImages = editProduct.productImg
    .filter((img) => !(img instanceof File) && img.public_id)
    .map((img) => img.public_id)

    formdata.append("existingImages", JSON.stringify(existingImages))

    //Add New Fiels
    editProduct.productImg
    .filter((img) => img instanceof File)
    .forEach((file) => {formdata.append("files", file)})

    try {
      const res = await axios.put(`http://localhost:8080/api/v1/product/update/${editProduct._id}`, formdata, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        toast.success("Product updated successfully")
        const updateProducts = products.map((p) => p._id === editProduct._id ? res.data.product : p)
        dispatch(setProducts(updateProducts))
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProductHandle = async(productId) => {
    try {
      const remainingProducts = products.filter((product) => product._id !== productId)
      const res = await axios.delete(`http://localhost:8080/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(setProducts(remainingProducts))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pl-[350px] pt-27 py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex justify-between'>
        <div className='relative bg-white rounded-lg'>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder="Search Product ..." className='w-[400px] items-center'/>
          <Search className='absolute right-3 top-1.5 text-gray-500'/>
        </div>
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>  
            <SelectItem value="lowToHigh">price: Low to High</SelectItem>
            <SelectItem value="HighToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {
        filteredProducts.map((product, index) => {
          return <Card key={index} className='px-4'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <img src={product?.productImg[0]?.url} alt="" className='w-25 h-25' />
                <h1 className='font-bold w-96 text-gray-700'>{product.productName}</h1>
              </div>
              <h1 className='font-semibold text-gray-800'>₹{product.productPrice}</h1>
              <div className='flex gap-3'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Edit onClick={() => {setOpen(true), setEditProduct(product)}} className='text-green-500 cursor-pointer'/>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Make changes to your product here. Click save when you&apos;re 
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='flex flex-col gap-2'>
                        <div className='grid gap-2'>
                          <Label>Product Name</Label>
                          <Input value={editProduct?.productName} onChange={handleChange} type='text' name="productName" placeholder="EX-Iphone" required/>
                        </div>

                        <div className='grid gap-2'>
                          <Label>Price</Label>
                          <Input value={editProduct?.productPrice} onChange={handleChange} type='number' name="productPrice" required/>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                          <div className='grid gap-2'>
                            <Label>Brand</Label>
                            <Input value={editProduct?.brand} onChange={handleChange} type='text' name="brand" placeholder="Ex-apple" required/>
                          </div>

                          <div className='grid gap-2'>
                            <Label>Category</Label>
                            <Input value={editProduct?.category} onChange={handleChange} type='text' name="category" placeholder="Ex-mobile" required/>
                          </div>
                        </div>

                        <div className='grid gap-2'>
                          <div className='flex items-center'>
                            <Label>Description</Label>
                          </div>
                          <Textarea value={editProduct?.productDesc} onChange={handleChange} name="productDesc" placeholder="Enter brief description of product"/>
                        </div>
                        <ImageUpload productData={editProduct} setProductData={setEditProduct}/>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave} type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 className='text-red-500 cursor-pointer'/>  
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteProductHandle(product._id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>               
              </div>
            </div>
          </Card>
        })
      }
    </div>
  )
}

export default AdminProduct