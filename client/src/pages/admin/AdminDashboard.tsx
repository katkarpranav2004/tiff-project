import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Users,
  Award,
  BookOpen,
  Calendar,
  Briefcase,
  MessageSquare,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '../../components/CountUp';

const AdminDashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axios.get('/api/dashboard/stats');
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  const { stats, recentActivity } = statsData || {};

  const statCards = [
    { title: 'Total Incubatees', value: stats?.totalIncubatees || 0, icon: <Users className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'Certificates Issued', value: stats?.totalCertificates || 0, icon: <Award className="w-6 h-6 text-green-500" />, bg: 'bg-green-50' },
    { title: 'Active Courses', value: stats?.publishedCourses || 0, icon: <BookOpen className="w-6 h-6 text-purple-500" />, bg: 'bg-purple-50' },
    { title: 'Upcoming Events', value: stats?.totalEvents || 0, icon: <Calendar className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Dashboard Overview</h1>
        <Link
          to="/admin/certificates"
          className="bg-brand hover:bg-brand-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Issue Certificate
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-navy"><CountUp>{String(card.value)}</CountUp></h3>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bg}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((log: any) => (
                <div key={log.id} className="p-6 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 text-sm">
                    {log.admin.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">
                      <span className="font-medium text-navy">{log.admin.name}</span> {log.action.toLowerCase()}d a {log.entityType}
                    </p>
                    {log.metadata && (
                      <p className="text-xs text-gray-500 mt-1">
                        {typeof log.metadata === 'string' ? log.metadata : JSON.stringify(log.metadata)}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">No recent activity</div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-fit">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-navy">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            <Link to="/admin/incubatees" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3 text-gray-700">
                <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-brand" />
                <span className="font-medium">Manage Incubatees</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
            </Link>
            <Link to="/admin/courses" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3 text-gray-700">
                <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-brand" />
                <span className="font-medium">Edit Courses</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
            </Link>
            <Link to="/admin/messages" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
              <div className="flex items-center gap-3 text-gray-700">
                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-brand" />
                <span className="font-medium">View Contact Messages</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
