import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


const Profile = () => {
  return (
    <div className='pt-20 min-h-screen bg-gray-100'>
        <Tabs defaultValue="profile" className='max-w-7xl mx-auto items-center'>
        
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
            <div className='flex flex-col justify-center items-center bg-gray-100 min-h-screen'>
                <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>

                <div className='w-full flex gap-10 justify-between items-start px-7'>
                    
                    {/* Profile picture */}
                    <div className="flex flex-col items-center">
                        <img src="/user.png" alt="profile" className="w-40 h-40 rounded-full object-cover border-4 border-pink-700"/>

                        <Label className="mt-5 cursor-pointer bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 transition whitespace-nowrap"> Change Picture
                        <input type="file" accept="image/*" className="hidden" /></Label>
                    </div>

                    {/* Profile form */}
                    <form className="space-y-6 bg-white shadow-md p-8 rounded-2xl w-full max-w-2xl">

                        <div>
                            <Label className="block text-sm font-semibold text-gray-700"> Name</Label>
                            <Input type="text" name="name" placeholder="John Doe" className="w-full mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"/>
                        </div>

                        <div>
                            <Label className="block text-sm font-semibold text-gray-700">Email</Label>
                            <Input type="email" name="email" disabled 
                            className="w-full mt-2 rounded-xl bg-gray-100 cursor-not-allowed"  />
                        </div>

                        <div>
                            <Label className="block text-sm font-semibold text-gray-700">Phone Number</Label>
                            <Input type="text" name="phoneNo" placeholder="Enter your Contact No" className="w-full mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                        </div>

                        <div>
                            <Label className="block text-sm font-semibold text-gray-700">Address</Label>
                            <Input type="text" name="address" placeholder="Enter your Address" className="w-full mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"/>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                            <Label className="block text-sm font-semibold text-gray-700">City</Label>
                            <Input type="text" name="city" placeholder="Enter your City" className="w-full mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"/>
                        </div>

                        <div>
                            <Label className="block text-sm font-semibold text-gray-700">Zip Code</Label>
                            <Input type="text" name="zipCode" placeholder="Enter your ZipCode" className="w-full mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                        </div>
                        </div> 

                        <Button type="submit" className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"> Update Profile </Button>

                    </form>
                </div>
            </div>
        </TabsContent>


        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>

            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>
        
    </div>
  )
}

export default Profile