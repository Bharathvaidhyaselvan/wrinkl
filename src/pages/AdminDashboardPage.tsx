import React, { useEffect, useState } from 'react';
import { useOrderStore } from '../store/orderStore';
import { Order } from '../types';

const AdminDashboardPage: React.FC = () => {
  const { orders, fetchOrders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    document.title = 'Admin Dashboard - Wrinkl';
    fetchOrders();
  }, [fetchOrders]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };
  
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-10 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {orders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No orders yet
                </div>
              ) : (
                orders.map((order) => (
                  <div 
                    key={order.id}
                    className={`p-4 cursor-pointer transition-colors duration-200 ${
                      selectedOrder?.id === order.id 
                        ? 'bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleOrderClick(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.id}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Order Information</h3>
                    <p className="mt-2 text-gray-900">
                      <span className="font-medium">ID:</span> {selectedOrder.id}
                    </p>
                    <p className="mt-1 text-gray-900">
                      <span className="font-medium">Date:</span> {formatDate(selectedOrder.createdAt)}
                    </p>
                    <p className="mt-1 text-gray-900">
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        selectedOrder.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        selectedOrder.status === 'processing' ? 'bg-purple-100 text-purple-800' :
                        selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                    <p className="mt-2 text-gray-900">
                      <span className="font-medium">Name:</span> {selectedOrder.customer.name}
                    </p>
                    <p className="mt-1 text-gray-900">
                      <span className="font-medium">Phone:</span> {selectedOrder.customer.phone}
                    </p>
                    <p className="mt-1 text-gray-900">
                      <span className="font-medium">Address:</span> {selectedOrder.customer.address}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Order Items</h3>
                  
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              ₹{item.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                              ₹{item.price * item.quantity}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            Total Amount
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-bold text-right">
                            ₹{selectedOrder.totalAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 transition-colors duration-200">
                    Update Status
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200">
                    Contact Customer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Order Selected</h3>
              <p className="text-gray-500">
                Select an order from the list to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;