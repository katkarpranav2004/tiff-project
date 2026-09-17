import { useQuery } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, Panel } from './AdminShared';

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const AdminMessages = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'messages'],
    queryFn: async () => (await api.get('/contact', { params: { limit: 50 } })).data.data as Message[],
  });

  return (
    <div>
      <AdminPageTitle title="Messages" subtitle="Enquiries submitted through the contact form." />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No messages yet" icon={<Mail className="h-8 w-8" />} />
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((m) => (
            <Panel key={m.id}>
              <div className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ink">{m.subject || '(No subject)'}</p>
                    <p className="text-sm text-slate-500">
                      {m.name} · <a href={`mailto:${m.email}`} className="text-brand-dark hover:underline">{m.email}</a>
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(m.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm text-slate-700">{m.message}</p>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
