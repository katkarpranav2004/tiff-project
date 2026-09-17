import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Panel, Modal, Field, SaveBar, adminInput, adminTextarea } from './AdminShared';

interface BoardMember {
  id: string;
  name: string;
  designation: string;
  bio?: string | null;
  imageUrl?: string | null;
  order: number;
}

const empty = { name: '', designation: '', bio: '', imageUrl: '', order: 0 };

const AdminBoard = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BoardMember | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'board'],
    queryFn: async () => (await api.get('/board-members')).data.data as BoardMember[],
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (m: BoardMember) => {
    setEditing(m);
    setForm({ name: m.name, designation: m.designation, bio: m.bio ?? '', imageUrl: m.imageUrl ?? '', order: m.order });
    setOpen(true);
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload = { ...form, order: Number(form.order) || 0, bio: form.bio || undefined, imageUrl: form.imageUrl || undefined };
      return editing
        ? (await api.put(`/board-members/${editing.id}`, payload)).data
        : (await api.post('/board-members', payload)).data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'board'] }); setOpen(false); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/board-members/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'board'] }),
  });

  return (
    <div>
      <AdminPageTitle title="Board Members" subtitle="Manage the Board of Directors shown on the site." action={<AddButton onClick={openNew} label="Add member" />} />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No board members yet" />
      ) : (
        <Panel>
          <table className="w-full text-sm">
            <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Designation</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-3 text-slate-500">{m.order}</td>
                  <td className="px-4 py-3 font-medium text-ink">{m.name}</td>
                  <td className="px-4 py-3 text-slate-600">{m.designation}</td>
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
        <Modal title={editing ? 'Edit board member' : 'Add board member'} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
            <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={adminInput} /></Field>
            <Field label="Designation"><input required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className={adminInput} /></Field>
            <Field label="Biography"><textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={adminTextarea} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Image URL"><input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={adminInput} /></Field>
              <Field label="Order"><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={adminInput} /></Field>
            </div>
            {save.isError && <p className="text-sm text-red-600">Could not save. Check the fields and try again.</p>}
            <SaveBar pending={save.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminBoard;
