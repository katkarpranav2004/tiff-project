import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Award,
  BookOpen,
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  FileText,
  UserSquare2,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';

const AdminSidebar = () => {
  const queryClient = useQueryClient();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Certificates', path: '/admin/certificates', icon: <Award size={20} /> },
    { name: 'Courses', path: '/admin/courses', icon: <BookOpen size={20} /> },
    { name: 'Incubatees', path: '/admin/incubatees', icon: <Briefcase size={20} /> },
    { name: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
    { name: 'Annual Reports', path: '/admin/reports', icon: <FileText size={20} /> },
    { name: 'Board Members', path: '/admin/board', icon: <UserSquare2 size={20} /> },
    { name: 'Mentors', path: '/admin/mentors', icon: <Users size={20} /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <HelpCircle size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    queryClient.setQueryData(['adminAuth'], null);
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-64 bg-navy text-white h-full flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-brand rounded flex items-center justify-center font-bold">
          TI
        </div>
        <span className="font-bold tracking-wide">Admin Portal</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              {
                'bg-brand text-white': isActive,
                'text-gray-400 hover:text-white hover:bg-white/5': !isActive,
              }
            )}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
