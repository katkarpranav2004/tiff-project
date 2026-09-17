import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Panel, Modal, Field, SaveBar, adminInput, adminTextarea } from './AdminShared';

interface Mentor {
  id: string;
  name: string;
  designation?: string | null;
  organization?: string | null;
  photo?: string | null;
  bio?: string | null;
  expertise?: string | null;
  linkedin?: string | null;
}

const empty = { name: '', designation: '', organization: '', photo: '', bio: '', expertise: '', linkedin: '' };

const AdminMentors = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Mentor | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'mentors'],
    queryFn: async () => (await api.get('/mentors')).data.data as Mentor[],
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (m: Mentor) => {
    setEditing(m);
    setForm({
      name: m.name, designation: m.designation ?? '', organization: m.organization ?? '',
      photo: m.photo ?? '', bio: m.bio ?? '', expertise: m.expertise ?? '', linkedin: m.linkedin ?? '',
    });
    setOpen(true);
  };

  const clean = (o: typeof empty) =>
    Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v === '' ? undefined : v]));

  const save = useMutation({
    mutationFn: async () =>
      editing
        ? (await api.put(`/mentors/${editing.id}`, clean(form))).data
        : (await api.post('/mentors', clean(form))).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'mentors'] }); setOpen(false); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/mentors/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'mentors'] }),
  });

  return (
    <div>
      <AdminPageTitle title="Mentors" subtitle="Add real mentors — they appear on the site only when present." action={<AddButton onClick={openNew} label="Add mentor" />} />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No mentors yet" />
      ) : (
        <Panel>
          <table className="w-full text-sm">
            <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Designation</th>
                <th className="px-4 py-3 font-semibold">Organization</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-3 font-medium text-ink">{m.name}</td>
                  <td className="px-4 py-3 text-slate-600">{m.designation || '—'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.organization || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(m)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => remove.mutate(m.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {open && (
        <Modal title={editing ? 'Edit mentor' : 'Add mentor'} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
            <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={adminInput} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Designation"><input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className={adminInput} /></Field>
              <Field label="Organization"><input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className={adminInput} /></Field>
            </div>
            <Field label="Expertise"><input value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} className={adminInput} placeholder="Comma separated" /></Field>
            <Field label="Bio"><textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={adminTextarea} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Photo URL"><input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className={adminInput} /></Field>
              <Field label="LinkedIn"><input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className={adminInput} /></Field>
            </div>
            {save.isError && <p className="text-sm text-red-600">Could not save. Check the fields and try again.</p>}
            <SaveBar pending={save.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminMentors;
