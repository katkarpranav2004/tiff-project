import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner } from '../../components/ui/Primitives';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => (await api.post('/auth/login', { email, password })).data,
    onSuccess: (data) => {
      // API shape: { success, data: { accessToken, admin } }
      const accessToken = data?.data?.accessToken;
      const admin = data?.data?.admin;
      if (!accessToken) {
        setError('Login failed: no token returned.');
        return;
      }
      localStorage.setItem('adminToken', accessToken);
      queryClient.setQueryData(['adminAuth'], { success: true, data: admin });
      navigate('/admin/dashboard');
    },
    onError: (err: any) => {
      setError(err?.response?.data?.error || 'Invalid credentials');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate();
  };

  const inputCls =
    'h-11 w-full rounded-md border border-slate-200 pl-10 pr-4 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand';

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand font-heading text-2xl font-bold text-white">
            TI
          </div>
          <h1 className="font-heading text-2xl font-bold text-ink">Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage TISS Incube Foundation</p>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            <Lock className="h-4 w-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder=""
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputCls} pr-10`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            {loginMutation.isPending ? <Spinner className="h-5 w-5" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
