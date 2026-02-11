import React from 'react'
import { Button } from './components/ui/button'
import Navbar from './components/ui/navbar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/ui/Footer'

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

      </Routes>

    </div>
  )
}

export default App