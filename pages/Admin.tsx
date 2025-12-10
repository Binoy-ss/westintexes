import React from 'react';
import { useStore } from '../store';
import { Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_BUNDLES } from '../constants';

const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 6390 },
  { name: 'Sun', sales: 3490 },
];

export default function Admin() {
  const { user } = useStore();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const totalRevenue = SALES_DATA.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm">
          <p className="text-sm text-slate-400 font-bold mb-1 uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm">
          <p className="text-sm text-slate-400 font-bold mb-1 uppercase tracking-wider">Active Users</p>
          <p className="text-3xl font-bold text-slate-900">1,234</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm">
          <p className="text-sm text-slate-400 font-bold mb-1 uppercase tracking-wider">Total Bundles</p>
          <p className="text-3xl font-bold text-slate-900">{MOCK_BUNDLES.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Sales Chart */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 text-lg">Weekly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="sales" fill="#ff6b6b" radius={[6, 6, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm">
           <h3 className="font-bold text-slate-900 mb-6 text-lg">User Growth Trend</h3>
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                   contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={4} dot={{r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bundles Table */}
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden p-2">
        <div className="px-6 py-6 border-b border-slate-50">
          <h3 className="font-bold text-slate-900 text-lg">Course Bundle Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_BUNDLES.map(bundle => (
                <tr key={bundle.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{bundle.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{bundle.examCategory}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">₹{bundle.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{bundle.studentsEnrolled}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-500 hover:text-primary-700 font-bold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}