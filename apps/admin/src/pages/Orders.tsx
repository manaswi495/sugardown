import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editAwb, setEditAwb] = useState('');
  const [refundAmount, setRefundAmount] = useState<number | ''>('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:3020/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleEditClick = (order: any) => {
    setEditingOrder(order);
    setEditingOrder(order);
    setEditStatus(order.status);
    setEditAwb(order.awbNumber || '');
    setRefundAmount('');
  };

  const handleSave = async () => {
    try {
      // If we are transitioning to REFUNDED, call the refund API first
      if (editStatus === 'REFUNDED' && editingOrder.status !== 'REFUNDED') {
        const refundRes = await fetch(`http://localhost:3020/api/admin/orders/${editingOrder.id}/refund`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            amount: refundAmount || editingOrder.totalAmount
          })
        });

        if (!refundRes.ok) {
          const errData = await refundRes.json();
          alert(`Refund Failed: ${errData.error}`);
          return;
        }
      } else {
        // Normal status update
        // Auto-change status to SHIPPED if an AWB number is provided and status hasn't already progressed
        let finalStatus = editStatus;
        if (editAwb && editAwb.trim() !== '' && ['PENDING', 'PAID'].includes(editingOrder.status) && editStatus === editingOrder.status) {
          finalStatus = 'SHIPPED';
        }

        const res = await fetch(`http://localhost:3020/api/admin/orders/${editingOrder.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            status: finalStatus,
            awbNumber: editAwb
          })
        });
        if (!res.ok) {
          alert('Failed to update order');
          return;
        }
      }

      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Error updating order');
    }
  };

  const handlePrintInvoice = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3020/api/admin/orders/${id}/invoice`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        alert('Failed to generate invoice');
      }
    } catch (error) {
      console.error('Invoice error:', error);
      alert('Error fetching invoice');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date / ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items / Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / AWB</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500 font-mono">{order.id.split('-')[0]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.user?.phone}</div>
                    <div className="text-sm text-gray-500">{order.user?.city}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="mb-1">
                      {order.items?.map((item: any) => (
                        <div key={item.id}>{item.quantity}x {item.product?.title}</div>
                      ))}
                    </div>
                    <div className="font-bold text-gray-900">₹{order.totalAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'PAID' ? 'bg-green-100 text-green-800' : 
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'DELIVERED' ? 'bg-purple-100 text-purple-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                    {order.awbNumber && <div className="text-xs text-gray-500 mt-1">AWB: {order.awbNumber}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handlePrintInvoice(order.id)}
                      className="text-gray-600 hover:text-gray-900 mr-4"
                    >
                      Print Invoice
                    </button>
                    <button 
                      onClick={() => handleEditClick(order)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Order</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                >
                  {/* Always show current status */}
                  <option 
                    value={editingOrder.status} 
                    disabled={['PENDING', 'PAID'].includes(editingOrder.status)}
                  >
                    {editingOrder.status} {['PENDING', 'PAID'].includes(editingOrder.status) ? '(Automated)' : ''}
                  </option>
                  
                  {/* Only allow logical progression */}
                  {['PENDING', 'PAID'].includes(editingOrder.status) && <option value="SHIPPED">SHIPPED</option>}
                  {editingOrder.status === 'SHIPPED' && <option value="DELIVERED">DELIVERED</option>}
                  
                  {/* Always allow cancellation/refunds from valid states */}
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="REFUNDED">REFUNDED</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tracking / AWB Number</label>
                <input 
                  type="text" 
                  value={editAwb}
                  onChange={(e) => setEditAwb(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="e.g. 1234567890"
                />
              </div>

              {editStatus === 'REFUNDED' && editingOrder.status !== 'REFUNDED' && (
                <div className="bg-red-50 p-4 rounded-md border border-red-100 mt-4">
                  <label className="block text-sm font-medium text-red-800">Refund Amount (₹)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input 
                      type="number" 
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value ? Number(e.target.value) : '')}
                      className="pl-7 block w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                      placeholder={`Full amount: ${editingOrder.totalAmount}`}
                      max={editingOrder.totalAmount}
                    />
                  </div>
                  <p className="mt-2 text-xs text-red-600">
                    Leave blank to issue a full refund of ₹{editingOrder.totalAmount}. 
                    Once saved, the money will be returned via Razorpay automatically.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingOrder(null)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
