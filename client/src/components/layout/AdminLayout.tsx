import { Outlet, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { api } from '../../lib/api';
import { Spinner } from '../ui/Primitives';

const AdminLayout = () => {
  // No token at all → bounce immediately, no network call, no flash of admin UI.
  const hasToken = Boolean(localStorage.getItem('adminToken'));

  const { data: auth, isLoading, isError } = useQuery({
    queryKey: ['adminAuth'],
    queryFn: async () => {
      const res = await api.get('/auth/me');
      return res.data as { success: boolean; data: { id: string; email: string; name: string; role: string } };
    },
    enabled: hasToken,
    retry: false,
  });

  if (!hasToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <Spinner className="h-10 w-10 text-brand" />
      </div>
    );
  }

  // Token invalid or expired → clear it and force re-login.
  if (isError || !auth?.success) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader admin={auth.data} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
