import React, { useEffect, useState } from 'react'
import { getUserOrders } from '../api/orderService'
import { Link } from 'react-router-dom'

function OrdersPage() {


  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      let response
      try {
        const response = await getUserOrders()
        console.log(response)
        setOrders(response.content)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

            <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold block">Order Date</span>
                  <span className="text-sm text-gray-800 font-medium">{formatDate(order.createdDate)}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold block">Order Code</span>
                  <span className="text-sm text-gray-800 font-medium font-mono text-xs">{order.orderCode}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 uppercase font-bold block">Total Amount</span>
                <span className="text-lg font-bold text-blue-600">${order.purchasePrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-4">
              {order.orderItems && order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0 border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.product?.name || "Product Name"}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.product?.description}</p>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <div className="font-medium text-gray-800">${item.purchasePrice}</div>
                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage