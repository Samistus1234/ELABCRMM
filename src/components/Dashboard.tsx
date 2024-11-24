import React from 'react';
import { 
  Users, FileText, Clock, AlertCircle,
  TrendingUp, MessageCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

const stats = [
  {
    name: 'Total Applications',
    value: '2,345',
    icon: FileText,
    change: '+4.75%',
    changeType: 'positive'
  },
  {
    name: 'Active Clients',
    value: '1,280',
    icon: Users,
    change: '+2.15%',
    changeType: 'positive'
  },
  {
    name: 'Pending Documents',
    value: '145',
    icon: Clock,
    change: '-5.25%',
    changeType: 'negative'
  },
  {
    name: 'Urgent Actions',
    value: '23',
    icon: AlertCircle,
    change: '-12.40%',
    changeType: 'positive'
  },
];

export function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                )}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-500 text-sm">{stat.name}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">DataFlow Application</p>
                    <p className="text-sm text-gray-500">John Doe • 2 hours ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Communications</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Document Update</p>
                    <p className="text-sm text-gray-500">Sarah Smith • 1 hour ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Email Sent
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}