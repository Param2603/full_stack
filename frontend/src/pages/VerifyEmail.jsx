import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

const VerifyEmail = () => {
    const {token} = useParams()
    const [status, setStatus] = useState("verifying")
    const [message, setMessage] = useState("Verifying your email...")
    const navigate = useNavigate()

    const verifyEmail = async()=>{
        try {
            if(!token){
                setStatus("error")
                setMessage("Invalid verification link. Token is missing.")
                return
            }

            const res = await axios.post(`http://localhost:8080/api/v1/user/verify`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if(res.data.success){
                setStatus('success')
                setMessage('✅ Email Verified Successfully! Redirecting to login...')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        } catch (err) {
            console.log(err)
            setStatus("error")
            if(err.response?.data?.message){
                setMessage(`❌ ${err.response.data.message}`)
            } else {
                setMessage("❌ Verification failed. Please try again or request a new verification link.")
            }
        }
    }

    useEffect(() => {
       verifyEmail()
    },[token]) 

  return (
      <div className='relative w-full bg-pink-100 overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center p-4'>
            <div className='bg-white p-8 rounded-2xl shadow-lg text-center w-[90%] max-w-md'>
                <div className='flex flex-col items-center gap-4'>
                    {status === "verifying" && (
                        <>
                            <Loader2 className='w-16 h-16 text-pink-600 animate-spin'/>
                            <h2 className='text-xl font-semibold text-gray-800'>{message}</h2>
                        </>
                    )}
                    {status === "success" && (
                        <>
                            <CheckCircle2 className='w-16 h-16 text-green-600'/>
                            <h2 className='text-xl font-semibold text-gray-800'>{message}</h2>
                        </>
                    )}
                    {status === "error" && (
                        <>
                            <XCircle className='w-16 h-16 text-red-600'/>
                            <h2 className='text-xl font-semibold text-gray-800'>{message}</h2>
                            <button 
                                onClick={() => navigate('/verify')}
                                className='mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors'
                            >
                                Request New Link
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
      </div>
  )
}

export default VerifyEmail