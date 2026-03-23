import React, { Children } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import SingleProduct from './pages/SingleProduct'
import AdminSales from './pages/admin/AdminSales'
import AddProduct from './pages/admin/AddProduct'
import AdminProduct from './pages/admin/AdminProduct'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'
import ShowUserOrders from './pages/admin/ShowUserOrders'
import UserInfo from './pages/admin/UserInfo'
import AddressForm from './pages/AddressForm'

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Navbar/> */}
        <Route path='/' element={<><Navbar/><Home/><Footer/></>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />  
        <Route path="/profile/:userId" element={<ProtectedRoute><Navbar/><Profile /></ProtectedRoute>} />  
        <Route path='/products' element={<><Navbar/><Products/></>}/>
        <Route path='/products/:id' element={<><Navbar/><SingleProduct/></>}/>
        <Route path='/cart' element={<ProtectedRoute><Navbar/><Cart/></ProtectedRoute>}/>
        <Route path='/address' element={<ProtectedRoute><AddressForm/></ProtectedRoute>}/>

        <Route path='/dashboard' element={<ProtectedRoute adminOnly={true}><Navbar/><Dashboard /></ProtectedRoute>}>
          <Route path="sales" element={<AdminSales />} />
          <Route path="add-product" element={<AddProduct/>} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/orders/:userId" element={<ShowUserOrders />} />
          <Route path="users/:id" element={<UserInfo />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App