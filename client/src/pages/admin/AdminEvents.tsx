import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { Spinner, EmptyState } from '../../components/ui/Primitives';
import { AdminPageTitle, AddButton, Panel, Modal, Field, SaveBar, adminInput, adminTextarea } from './AdminShared';

interface EventItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  date: string;
  time?: string | null;
  location?: string | null;
  registrationUrl?: string | null;
  isPublished: boolean;
}

const empty = {
  title: '', description: '', imageUrl: '', date: '', time: '', location: '', registrationUrl: '', isPublished: true,
};

const AdminEvents = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'events'],
    queryFn: async () => (await api.get('/events/all')).data.data as EventItem[],
  });

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (ev: EventItem) => {
    setEditing(ev);
    setForm({
      title: ev.title, description: ev.description, imageUrl: ev.imageUrl ?? '',
      date: ev.date ? ev.date.slice(0, 10) : '', time: ev.time ?? '', location: ev.location ?? '',
      registrationUrl: ev.registrationUrl ?? '', isPublished: ev.isPublished,
    });
    setOpen(true);
  };

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        imageUrl: form.imageUrl || undefined,
        time: form.time || undefined,
        location: form.location || undefined,
        registrationUrl: form.registrationUrl || '',
      };
      return editing
        ? (await api.put(`/events/${editing.id}`, payload)).data
        : (await api.post('/events', payload)).data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'events'] });
      qc.invalidateQueries({ queryKey: ['events'] });
      setOpen(false);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => (await api.delete(`/events/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'events'] });
      qc.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return (
    <div>
      <AdminPageTitle title="Events" subtitle="Manage events shown on the site." action={<AddButton onClick={openNew} label="Add event" />} />

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner className="h-8 w-8 text-brand" /></div>
      ) : (data ?? []).length === 0 ? (
        <EmptyState title="No events yet" description="Click “Add event” to publish one." />
      ) : (
        <Panel>
          <table className="w-full text-sm">
            <thead className="bg-surface-alt text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data ?? []).map((ev) => (
                <tr key={ev.id}>
                  <td className="px-4 py-3 font-medium text-ink">{ev.title}</td>
                  <td className="px-4 py-3 text-slate-600">{ev.date ? ev.date.slice(0, 10) : ''}</td>
                  <td className="px-4 py-3 text-slate-600">{ev.location}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ev.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {ev.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(ev)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm('Delete this event?')) remove.mutate(ev.id); }} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {open && (
        <Modal title={editing ? 'Edit event' : 'Add event'} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
            <Field label="Title"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={adminInput} /></Field>
            <Field label="Description"><textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={adminTextarea} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date"><input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={adminInput} /></Field>
              <Field label="Time"><input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={adminInput} placeholder="e.g. 10:00 AM" /></Field>
            </div>
            <Field label="Location"><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={adminInput} /></Field>
            <Field label="Image URL"><input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={adminInput} placeholder="https://…" /></Field>
            <Field label="Registration URL"><input value={form.registrationUrl} onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })} className={adminInput} placeholder="https://…" /></Field>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              Published (visible on the site)
            </label>
            {save.isError && <p className="text-sm text-red-600">Could not save. Check required fields (title, description, date).</p>}
            <SaveBar pending={save.isPending} onCancel={() => setOpen(false)} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminEvents;
