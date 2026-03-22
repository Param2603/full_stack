import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import UserLogo from "../../assets/user.png"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserInfo = () => {
  const navigate = useNavigate()
  const [updateUser, setUpdateUser] = useState(null)
  const [file, setFile] = useState(null)
  const { user } = useSelector(store => store.user)
  const params = useParams()
  const userId = params.id

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const accessToken = localStorage.getItem("accessToken")

    try {
      const formData = new FormData()
      formData.append("name", updateUser.name)
      formData.append("email", updateUser.email)
      formData.append("phoneNo", updateUser.phoneNo)
      formData.append("address", updateUser.address)
      formData.append("city", updateUser.city)
      formData.append("zipCode", updateUser.zipCode)
      formData.append("role", updateUser.role)

      if (file) {
        formData.append("file", file)
      }

      await axios.put(
        `http://localhost:8080/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

    } catch (error) {
      console.log(error)
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/get-user/${userId}`)
      if (res.data.success) {
        setUpdateUser(res.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
  <div className='pl-[350px] py-20 pr-20 bg-gray-100 min-h-screen'>
    <div className='max-w-5xl mx-auto'>

      {/* Header */}
      <div className='flex pt-10 justify-center items-center gap-4 mb-10'>
        <Button onClick={() => navigate(-1)} className="bg-black text-white hover:bg-gray-800 px-3 py-2">
          <ArrowLeft size={18}/>
        </Button>
        <h1 className='text-2xl font-bold text-gray-800'>Update Profile</h1>
      </div>

      {/* Main Layout */}
      <div className='flex justify-center items-start gap-20'>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="p-[4px] rounded-full bg-pink-600">
            <img
              src={updateUser?.profilePic || UserLogo}
              alt="profile"
              className="w-44 h-44 rounded-full object-cover bg-white"
            />
          </div>

          <Label className="mt-5 cursor-pointer bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-[450px] space-y-5">

          
            <div>
              <Label className="text-sm text-gray-600">Name</Label>
              <Input
                type="text"
                name="name"
                value={updateUser?.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

          <div>
            <Label className="text-sm text-gray-600">Email</Label>
            <Input
              type="email"
              name="email"
              disabled
              value={updateUser?.email}
              className="mt-1 bg-gray-100"
            />
          </div>

          <div>
            <Label className="text-sm text-gray-600">Phone Number</Label>
            <Input
              type="text"
              name="phoneNo"
              value={updateUser?.phoneNo}
              onChange={handleChange}
              placeholder="Enter your Contact No"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm text-gray-600">Address</Label>
            <Input
              type="text"
              name="address"
              value={updateUser?.address}
              onChange={handleChange}
              placeholder="Enter your Address"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">City</Label>
              <Input
                type="text"
                name="city"
                value={updateUser?.city}
                onChange={handleChange}
                placeholder="Enter your City"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm text-gray-600">Zip Code</Label>
              <Input
                type="text"
                name="zipCode"
                value={updateUser?.zipCode}
                onChange={handleChange}
                placeholder="Enter your ZipCode"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-md"
          >
            Update Profile
          </Button>

        </form>
      </div>
    </div>
  </div>
)
}

export default UserInfo