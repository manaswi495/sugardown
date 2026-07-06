import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersToday: 0,
    activeProducts: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('http://localhost:3020/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    }
    
    if (token) {
      fetchStats();
    }
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Total Sales</div>
          <div className="text-3xl font-bold text-gray-900">₹{stats.totalSales.toLocaleString()}</div>
        </div>
        
        {/* Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Orders Today</div>
          <div className="text-3xl font-bold text-gray-900">{stats.ordersToday}</div>
        </div>
        
        {/* Active Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-500 mb-2">Active Products</div>
          <div className="text-3xl font-bold text-gray-900">{stats.activeProducts}</div>
        </div>
      </div>
    </div>
  );
}
