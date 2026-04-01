import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: []
  })

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")

      const res = await axios.get(
        `${import.meta.env.VITE_URL || 'http://localhost:8080'}/api/v1/orders/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res.data.success) {
        setStats({
          totalUsers: res.data.totalUsers || 0,
          totalProducts: res.data.totalProducts || 0,
          totalOrders: res.data.totalOrders || 0,
          totalSales: res.data.totalSales || 0,
          salesByDate: res.data.sales || []
        })
      }

    } catch (error) {
      console.log("❌ Error fetching stats:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className='pl-[350px] bg-gray-100 py-20 pr-20 mx-auto px-4'>
      <div className='p-6 grid gap-6 lg:grid-cols-4'>

        {/* Stats Cards */}
        <Card className='bg-pink-500 text-white shadow'>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardContent className='text-2xl font-bold'>
              {stats.totalUsers}
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='bg-pink-500 text-white shadow'>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardContent className='text-2xl font-bold'>
              {stats.totalProducts}
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='bg-pink-500 text-white shadow'>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardContent className='text-2xl font-bold'>
              {stats.totalOrders}
            </CardContent>
          </CardHeader>
        </Card>

        <Card className='bg-pink-500 text-white shadow'>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardContent className='text-2xl font-bold'>
              ₹{stats.totalSales.toLocaleString("en-IN")}
            </CardContent>
          </CardHeader>
        </Card>

        {/* Sales Chart */}
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle>Sales (Last 30 Days)</CardTitle>
          </CardHeader>

          {/* IMPORTANT: height must be fixed */}
          <CardContent style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesByDate}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F472B6"
                  fill="#F472B6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default AdminSales