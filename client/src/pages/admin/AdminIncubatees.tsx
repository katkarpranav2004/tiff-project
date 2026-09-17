import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Panel, Modal, Field, SaveBar, adminInput, adminTextarea } from './AdminShared';

interface Incubatee {
  id: string;
  name: string;
  logo?: string | null;
  founder?: string | null;
  sector?: string | null;
  description?: string | null;
  website?: string | null;
  featured: boolean;
}

const empty = { name: '', sector: '', founder: '', website: '', logo: '', description: '', featured: false };

const AdminIncubatees = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Incubatee | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'incubatees'],
    queryFn: async () => (await api.get('/incubatees')).data.data as Incubatee[],
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (i: Incubatee) => {
    setEditing(i);
    setForm({
      name: i.name, sector: i.sector ?? '', founder: i.founder ?? '', website: i.website ?? '',
      logo: i.logo ?? '', description: i.description ?? '', featured: i.featured,
    });
    setOpen(true);
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        sector: form.sector || undefined,
        founder: form.founder || undefined,
        logo: form.logo || undefined,
        description: form.description || undefined,
        website: form.website || '',
      };
      return editing
        ? (await api.put(`/incubatees/${editing.id}`, payload)).data
        : (await api.post('/incubatees', payload)).data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'incubatees'] });
      qc.invalidateQueries({ queryKey: ['incubatees'] });
      setOpen(false);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/incubatees/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'incubatees'] });
      qc.invalidateQueries({ queryKey: ['incubatees'] });
    },
  });

  return (
    <div>
      <AdminPageTitle title="Incubatees" subtitle="Manage the portfolio shown on the site." action={<AddButton onClick={openNew} label="Add incubatee" />} />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No incubatees yet" description="Click “Add incubatee” to add one." />
      ) : (
        <Panel>
          <table className="w-full text-sm">
            <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Sector</th>
                <th className="px-4 py-3 font-semibold">Founder</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((i) => (
                <tr key={i.id}>
                  <td className="px-4 py-3 font-medium text-ink">{i.name}</td>
                  <td className="px-4 py-3 text-slate-600">{i.sector}</td>
                  <td className="px-4 py-3 text-slate-600">{i.founder}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(i)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Delete this incubatee?')) remove.mutate(i.id); }} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {open && (
        <Modal title={editing ? 'Edit incubatee' : 'Add incubatee'} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
            <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={adminInput} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Sector"><input value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className={adminInput} /></Field>
              <Field label="Founder"><input value={form.founder} onChange={(e) => setForm({ ...form, founder: e.target.value })} className={adminInput} /></Field>
            </div>
            <Field label="Website"><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={adminInput} placeholder="https://…" /></Field>
            <Field label="Logo URL"><input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className={adminInput} placeholder="https://…" /></Field>
            <Field label="Description"><textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={adminTextarea} /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
            {save.isError && <p className="text-sm text-red-600">Could not save. Check the fields (website must be a valid URL or empty).</p>}
            <SaveBar pending={save.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminIncubatees;
