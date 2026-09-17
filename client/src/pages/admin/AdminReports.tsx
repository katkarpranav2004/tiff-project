import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, ExternalLink } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Panel, Modal, Field, SaveBar, adminInput } from './AdminShared';

interface Report {
  id: string;
  title: string;
  year: string;
  fileUrl?: string | null;
}

const AdminReports = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', year: '', fileUrl: '' });

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'reports'],
    queryFn: async () => (await api.get('/reports')).data.data as Report[],
  });

  const create = useMutation({
    mutationFn: async () =>
      (await api.post('/reports', { title: form.title, year: form.year, fileUrl: form.fileUrl || undefined })).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'reports'] });
      setOpen(false);
      setForm({ title: '', year: '', fileUrl: '' });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/reports/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'reports'] }),
  });

  return (
    <div>
      <AdminPageTitle
        title="Annual Reports"
        subtitle="Publish yearly reports without touching code."
        action={<AddButton onClick={() => setOpen(true)} label="Add report" />}
      />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No reports yet" />
      ) : (
        <Panel>
          <table className="w-full text-sm">
            <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">File</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-ink">{r.year}</td>
                  <td className="px-4 py-3 text-slate-600">{r.title}</td>
                  <td className="px-4 py-3">
                    {r.fileUrl ? (
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-dark hover:underline">
                        Open <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove.mutate(r.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {open && (
        <Modal title="Add annual report" onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); create.mutate(); }} className="space-y-4">
            <Field label="Year (e.g. 2025-26)">
              <input required value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className={adminInput} />
            </Field>
            <Field label="Title">
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={adminInput} placeholder="Annual Report 2025-26" />
            </Field>
            <Field label="PDF URL">
              <input value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className={adminInput} placeholder="https://…/report.pdf" />
            </Field>
            {create.isError && <p className="text-sm text-red-600">Could not save. Check the fields and try again.</p>}
            <SaveBar pending={create.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminReports;
